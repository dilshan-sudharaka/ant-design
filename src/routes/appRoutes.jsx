import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EmpEdit from "../pages/EmpEdit";
import EmpDetails from "../pages/EmpDetails";
import NotFound from "../pages/NotFound";
import AddEmp from "../pages/AddEmp";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* private routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/emp-edit/:id" element={<EmpEdit />} />
          <Route path="/emp-details/:id" element={<EmpDetails />} />
          <Route path="/add-emp" element={<AddEmp />} />
        </Route>

        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
