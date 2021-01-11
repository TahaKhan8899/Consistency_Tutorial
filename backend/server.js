import express from "express";

const app = express();

app.use(express.json());

app.get("/goals", (req, res) => {
  try {
    const AllGoals = [
      { id: 0, name: "lose weight" },
      { id: 1, name: "goal 1" },
      { id: 2, name: "goal 2" },
      { id: 3, name: "goal 3" },
    ];
    res.send(AllGoals);
  } catch (error) {
    console.log("goals not found");
  }
});

app.listen(5001, () => {
  console.log("app listening at http://localhost:5001");
});
