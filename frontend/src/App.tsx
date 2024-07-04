import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientPage from "./components/Patient";
import AppointmentPage from "./components/Appointment";
import DoctorPage from "./components/Doctor";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ margin: "30px" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<AppointmentPage />} />
          <Route path="/patients" element={<PatientPage />} />
          <Route path="doctors" element={<DoctorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
