import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

import userRoutes from "./routes/userRoutes.js";
import studentsRoutes from "./routes/studentsRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });



app.use("/api/auth", userRoutes);
app.use("/", studentsRoutes);








const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
