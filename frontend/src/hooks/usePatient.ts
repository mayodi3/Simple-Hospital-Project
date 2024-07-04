import axios, { CanceledError } from "axios";
import { useState, useEffect, FormEvent } from "react";

interface Patient {
  _id?: string;
  name: string;
  age: string;
  gender: string;
}

const usePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState<Patient>({
    name: "",
    age: "",
    gender: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState<string | undefined>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("http://localhost:3000/api/patients", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setPatients(data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  function resetForm() {
    setNewPatient({
      name: "",
      age: "",
      gender: "",
    });
  }

  const admitPatient = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/patients", newPatient)
      .then(({ data }) => {
        setPatients([data, ...patients]);
        resetForm();
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };

  const updatePatient = (event: FormEvent) => {
    event.preventDefault();

    axios
      .patch(`http://localhost:3000/api/patients/${id}`, newPatient)
      .then(({ data }) => {
        setPatients(
          patients.map((patient) => (patient._id === id ? data : patient))
        );
        resetForm();
        setIsEditMode(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error);
      });
  };

  const deletePatient = (id: string | undefined) => {
    axios
      .delete(`http://localhost:3000/api/patients/${id}`)
      .then(() => setPatients(patients.filter((patient) => patient._id !== id)))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
  };

  return {
    error,
    isEditMode,
    updatePatient,
    admitPatient,
    newPatient,
    setNewPatient,
    setIsEditMode,
    setId,
    deletePatient,
    patients,
  };
};

export default usePatient;
