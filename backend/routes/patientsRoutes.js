import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from "../controllers/patientControllers.js";

const router = Router();

router.post("/", createPatient);
router.get("/", getPatients);
router.patch("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
