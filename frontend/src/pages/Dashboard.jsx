import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ employees: 0, tasks: 0 });
  const [recent, setRecent] = useState([]);

  const fetchStats = async () => {
    try {
      const [eRes, tRes] = await Promise.all([api.get("/employees"), api.get("/tasks")]);
      setStats({ employees: eRes.data.length, tasks: tRes.data.length });
      setRecent(tRes.data.slice(-5).reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Employees</div>
          <div className="text-3xl font-bold">{stats.employees}</div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Tasks</div>
          <div className="text-3xl font-bold">{stats.tasks}</div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 h-2 rounded">
              <div className="h-2 rounded bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${stats.employees ? Math.min(100, Math.round((stats.tasks / (stats.employees || 1)) * 100)) : 0}%` }} />
            </div>
            <div className="text-xs text-gray-500 mt-1">Tasks per employee: {stats.employees ? (stats.tasks / stats.employees).toFixed(1) : '—'}</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Quick Actions</div>
          <div className="mt-2 space-x-2">
            <button onClick={() => window.location.assign('/employees/add')} className="px-3 py-2 bg-indigo-600 text-white rounded">Add Employee</button>
            <button onClick={() => window.location.assign('/tasks/add')} className="px-3 py-2 bg-blue-600 text-white rounded">Add Task</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-3">Recent Tasks</h3>
        <ul className="space-y-2">
          {recent.length === 0 && <li className="text-sm text-gray-500">No recent tasks</li>}
          {recent.map((task) => (
            <li key={task._id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-500">{task.assignedTo?.name || "Unassigned"}</div>
              </div>
              <div className="text-sm px-2 py-1 rounded text-white" style={{ background: task.status === 'Completed' ? '#16a34a' : task.status === 'In Progress' ? '#2563eb' : '#f59e0b' }}>{task.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
