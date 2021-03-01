import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { pool } from "../db/dbConnect";
import { getToken } from "../util";

const router = express.Router();

const saltRounds = 10;

const userInfoValidation = (action) => {
  switch (action) {
    case "signin":
      return [
        body("email", "Incorrect email").exists().isEmail(),
        body("password", "Incorrect password").exists().isLength({ min: 5 }),
      ];
    case "register":
      return [
        body("firstName", "First name field missing")
          .exists()
          .isLength({ min: 1 }),
        body("lastName", "Last name field missing")
          .exists()
          .isLength({ min: 1 }),
        body("email", "Invalid email").exists().isEmail(),
        body("email").custom(async (email) => {
          const queryForEmail = {
            text: "SELECT email FROM USERS WHERE email = $1",
            values: [email],
          };
          const queryRes = await pool.query(queryForEmail);
          if (queryRes.rows.length > 0) {
            throw new Error("Email already in use");
          }
          return true;
        }),
        body("password", "Password must be at least 5 characters")
          .exists()
          .isLength({ min: 5 }),
        body(
          "passwordConfirmation",
          "Password confirmation must be at least 5 characters"
        )
          .exists()
          .isLength({ min: 5 })
          .custom((passwordConf, { req }) => {
            if (passwordConf !== req.body.password) {
              throw new Error("Password confirmation does not match password");
            }
            return true;
          }),
      ];
    default:
      break;
  }
};

router.post("/register", userInfoValidation("register"), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send(errors.array());
  }
  const { firstName, lastName, email, password } = req.body;

  // hash the password
  const pwHash = await bcrypt.hash(password, saltRounds);

  const createUserQuery = {
    text:
      "INSERT INTO users(firstName, lastName, email, passwordHash) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email",
    values: [firstName, lastName, email, pwHash],
  };

  const queryRes = await pool
    .query(createUserQuery)
    .catch(() =>
      res
        .status(401)
        .send([{ param: "registrationError", msg: "Unable to add user." }])
    );

  const newUser = queryRes.rows[0];

  res.send({ ...newUser, token: getToken(newUser) });
});

router.post("/signin", userInfoValidation("signin"), async (req, res) => {
  // input validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send(errors.array());
  }

  // check if email exists in the DB
  const { email, password } = req.body;
  const queryForUser = {
    text: "SELECT * FROM USERS WHERE email = $1",
    values: [email],
  };
  const queryRes = await pool.query(queryForUser);
  const listOfUsers = queryRes.rows;
  if (listOfUsers.length === 0) {
    return res
      .status(401)
      .send([{ param: "userNotFound", msg: "Incorrect email or password" }]);
  }

  // check if pw from DB matches entered password
  const possibleUser = listOfUsers[0];
  const checkPasswordMatch = await bcrypt.compare(
    password,
    possibleUser.passwordhash
  );
  if (!checkPasswordMatch) {
    return res
      .status(401)
      .send([{ param: "userNotFound", msg: "Incorrect email or password" }]);
  }
  const { passwordhash, ...userWithoutPw } = possibleUser;
  res.send({ ...userWithoutPw, token: getToken(userWithoutPw) });
});

export default router;
