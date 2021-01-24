import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

const userInfoValidation = (action) => {
  switch (action) {
    case "register":
      return [
        body("firstName", "First name field missing")
          .exists()
          .isLength({ min: 1 }),
        body("lastName", "Last name field missing")
          .exists()
          .isLength({ min: 1 }),
        body("email", "Invalid email").exists().isEmail(),
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

router.post("/register", userInfoValidation("register"), (req, res) => {
  const user = { name: "taha" };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send(errors.array());
  }
  res.send(user);
});

export default router;
