import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  const { patientName, doctorName } = req.body;
  try {
    const appointment = await Appointment.create({ patientName, doctorName });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById({ _id: id });
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById({ _id: id });
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    const deletedAppointment = await Appointment.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};

export {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
