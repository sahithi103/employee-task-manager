import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen p-6 shadow-md border-r">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
        </li>
        <li>
          <Link to="/employees" className="block text-gray-700 hover:text-blue-600">Employees</Link>
        </li>
        <li>
          <Link to="/employees/add" className="block text-gray-500 text-sm hover:text-blue-600">+ Add Employee</Link>
        </li>
        <li>
          <Link to="/tasks" className="block text-gray-700 hover:text-blue-600">Tasks</Link>
        </li>
        <li>
          <Link to="/tasks/add" className="block text-gray-500 text-sm hover:text-blue-600">+ Add Task</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
