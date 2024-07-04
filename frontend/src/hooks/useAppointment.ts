import axios, { CanceledError } from "axios";
import { useState, useEffect, FormEvent } from "react";

interface Appointment {
  _id?: string;
  patientName: string;
  doctorName: string;
  createdAt?: string;
  updatedAt?: string;
}

const useAppointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    patientName: "",
    doctorName: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState<string | undefined>("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("http://localhost:3000/api/appointments", {
        signal: controller.signal,
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  const resetForm = () => {
    setNewAppointment({
      patientName: "",
      doctorName: "",
    });
  };

  const bookAppointment = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/appointments", newAppointment)
      .then(({ data }) => {
        setAppointments([data, ...appointments]);
        setIsEditMode(false);
        resetForm();
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };

  const updateAppointment = (event: FormEvent) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:3000/api/appointments/${id}`, newAppointment)
      .then(({ data }) => {
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? data : appointment
          )
        );
        setIsEditMode(false);
        resetForm();
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };

  const deleteAppointment = (_id: string | undefined) => {
    axios
      .delete(`http://localhost:3000/api/appointments/${_id}`)
      .then(() => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== _id)
        );
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };
  return {
    error,
    isEditMode,
    updateAppointment,
    bookAppointment,
    newAppointment,
    setNewAppointment,
    setIsEditMode,
    appointments,
    deleteAppointment,
    setId,
  };
};

export default useAppointment;
