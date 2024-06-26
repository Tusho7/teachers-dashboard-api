import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import wsServer from "./utils/notification.js";
import userRoutes from "./routes/userRoutes.js";
import studentsRoutes from "./routes/studentsRoutes.js";
import cookieParser from "cookie-parser";
import { getMonthlyRevenue } from "./controllers/monthlyRevenue.js";

const app = express();
dotenv.config();

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
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
app.use("/", getMonthlyRevenue)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


wsServer.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log('Message from client:', message);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
