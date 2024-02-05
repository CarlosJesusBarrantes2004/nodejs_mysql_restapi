import express, { json } from "express";
import employeeRouter from "./routes/employees.routes.js";

const app = express();

//middleware
app.use(json());
app.use("/api", employeeRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "endpoint not found" });
});

export default app;
