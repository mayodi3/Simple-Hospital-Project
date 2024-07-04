import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Appointment", appointmentSchema);
