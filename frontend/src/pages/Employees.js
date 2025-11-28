import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = employees.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.email.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <div className="flex items-center space-x-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="p-2 border rounded" />
          {user ? (
            <button onClick={() => navigate('/employees/add')} className="px-3 py-2 bg-blue-600 text-white rounded">Add Employee</button>
          ) : (
            <button onClick={() => navigate('/login')} className="px-3 py-2 bg-gray-200 text-gray-700 rounded">Login to add</button>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">Loading...</td>
              </tr>
            )}

            {!loading && filtered.map((emp) => (
              <tr key={emp._id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-3 font-semibold">{(emp.name || 'U').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{emp.role}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {user && (
                    <>
                      <button onClick={() => navigate(`/employees/${emp._id}/edit`)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                      <button onClick={() => deleteEmployee(emp._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                    </>
                  )}
                  {!user && (
                    <div className="text-sm text-gray-400">Login to manage</div>
                  )}
                </td>
              </tr>
            ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
