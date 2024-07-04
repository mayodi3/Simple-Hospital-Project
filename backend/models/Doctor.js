import { Schema, model } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});

export default model("Doctor", doctorSchema);
