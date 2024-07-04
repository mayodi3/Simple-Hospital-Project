import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorControllers.js";

const router = Router();

router.post("/", createDoctor);
router.get("/", getDoctors);
router.patch("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
