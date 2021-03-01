import express from "express";
import { pool } from "../db/dbConnect";
import { getAuthUser } from "../util";

const router = express.Router();

router.get("/", getAuthUser, async (req, res) => {
  const authUser = req.user;

  const findGoalsQuery = {
    text: "SELECT * FROM goals where userID = $1",
    values: [authUser.id],
  };

  const queryRes = await pool.query(findGoalsQuery).catch(() => {
    return res
      .status(401)
      .send([{ param: "read error", msg: "Error fetching goals" }]);
  });

  const AllGoals = queryRes.rows;
  res.send(AllGoals);
});

export default router;
