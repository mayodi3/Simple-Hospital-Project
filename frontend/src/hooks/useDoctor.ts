import axios, { CanceledError } from "axios";
import { useState, useEffect, FormEvent } from "react";

interface Doctor {
  _id?: string;
  name: string;
  speciality: string;
}

const useDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    name: "",
    speciality: "",
  });
  const [id, setId] = useState<string | undefined>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("http://localhost:3000/api/doctors", { signal: controller.signal })
      .then(({ data }) => {
        setDoctors(data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  function resetForm() {
    setNewDoctor({
      name: "",
      speciality: "",
    });
  }

  const addDoctor = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/doctors", newDoctor)
      .then(({ data }) => {
        setDoctors([data, ...doctors]);
        resetForm();
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error);
      });
  };

  const updateDoctor = (event: FormEvent) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:3000/api/doctors/${id}`, newDoctor)
      .then(({ data }) => {
        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? data : doctor))
        );
        setIsEditMode(false);
        resetForm();
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };

  const deleteDoctor = (id: string | undefined) => {
    axios
      .delete(`http://localhost:3000/api/doctors/${id}`)
      .then(() => setDoctors(doctors.filter((doctor) => doctor._id !== id)))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error);
      });
  };

  return {
    doctors,
    error,
    isEditMode,
    updateDoctor,
    addDoctor,
    newDoctor,
    setNewDoctor,
    setIsEditMode,
    setId,
    deleteDoctor,
  };
};

export default useDoctor;
