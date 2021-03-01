import express, { response } from "express";
import userRoutes from "./routes/userRoutes";
import goalsRoutes from "./routes/goalsRoutes";

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

app.use("/goals", goalsRoutes);

app.listen(5001, () => {
  console.log("app listening at http://localhost:5001");
});
