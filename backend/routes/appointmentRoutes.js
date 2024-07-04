import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentController.js";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
