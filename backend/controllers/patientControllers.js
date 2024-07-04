import Patient from "../models/Patient.js";

const createPatient = async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    const patient = await Patient.create({ name, age, gender });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById({ _id: id });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    const updatedpatient = await Patient.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedpatient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById({ _id: id });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    const deletedPatient = await Patient.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedPatient);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

export { createPatient, getPatients, updatePatient, deletePatient };
