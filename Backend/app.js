import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

// To connect backend to frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["POST"],
    credentials: true,
  })
);

// To convert json string to json object
app.use(express.json());

// This middleware is used to parse incoming requests with application/x-www-form-urlencoded data. This data is usually sent in the body of a POST request when a form is submitted.
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

// Database connection
dbConnection();

// Error handling
app.use(errorMiddleware);

export default app;
