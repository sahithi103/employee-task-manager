import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Employees from "./pages/Employees";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee.jsx";
import AddTask from "./pages/AddTask";
import Tasks from "./pages/Tasks";
import MainLayout from "./layouts/MainLayout";
import EditEmployee from "./pages/EditEmployee";
import EditTask from "./pages/EditTask";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages - render without MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main application layout */}
        <Route element={<MainLayout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="employees/:id/edit" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />

          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
          <Route path="tasks/:id/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
