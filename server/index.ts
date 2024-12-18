import express from "express"
import mongoose from "mongoose"
import { apiConfig } from "./config"
import { authRouter } from "./routes/auth"
import cors from "cors"
import { teacherRouter } from "./routes/teacher"
import { adminRouter } from "./routes/admin"

const app = express()

app.use(express.json());
app.use(cors(apiConfig.cors));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/auth", authRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/admin", adminRouter)

mongoose.connect(apiConfig.db.mongoUrl).then(() => {
  app.listen(apiConfig.ports.appPort, () => {
    console.log(
      "server is up and running and connected to the DB on port ",
      apiConfig.ports.appPort
    );
  });
});