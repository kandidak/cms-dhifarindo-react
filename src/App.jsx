import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import LoadingOverlay from "@/components/molecules/loading-overlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dataStorage = localStorage.getItem("user");
  const user = JSON.parse(dataStorage);
  return (
    <>
      <LoadingOverlay />
      <ToastContainer />
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to={user ? `/dashboard/home` : `/auth/sign-in`} replace />} />
      </Routes>
    </>
  );
}

export default App;
