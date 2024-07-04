import express from "express";
import cors from "cors";
import connectToDBAndServer from "./connection.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import doctorsRouter from "./routes/doctorRoutes.js";
import patientsRouter from "./routes/patientsRoutes.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);

connectToDBAndServer();
