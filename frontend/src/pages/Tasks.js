import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    // set initial query from URL if present
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setQuery(q);
  }, [location.search]);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase()));

  const statusColor = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <div className="flex items-center space-x-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks" className="p-2 border rounded" />
          {user ? (
            <button onClick={() => navigate('/tasks/add')} className="px-3 py-2 bg-blue-600 text-white rounded">Add Task</button>
          ) : (
            <button onClick={() => navigate('/login')} className="px-3 py-2 bg-gray-200 text-gray-700 rounded">Login to add</button>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">Loading...</td>
              </tr>
            )}

            {!loading && filtered.map((task) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(task.status)}`}>{task.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{task.assignedTo?.name || 'Unassigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {user ? (
                    <>
                      <button onClick={() => navigate(`/tasks/${task._id}/edit`)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                      <button onClick={() => deleteTask(task._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                    </>
                  ) : (
                    <div className="text-sm text-gray-400">Login to manage</div>
                  )}
                </td>
              </tr>
            ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">No tasks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
