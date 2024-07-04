import Doctor from "../models/Doctor.js";

const createDoctor = async (req, res) => {
  const { name, speciality } = req.body;
  try {
    const doctor = await Doctor.create({ name, speciality });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById({ _id: id });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    const updateddoctor = await Doctor.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updateddoctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById({ _id: id });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    const deletedDoctor = await Doctor.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedDoctor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

export { createDoctor, getDoctors, updateDoctor, deleteDoctor };
