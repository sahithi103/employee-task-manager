import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddTask = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "Pending", employee: "" });
  const [saving, setSaving] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.employee) {
      alert('Please assign the task to an employee');
      return;
    }
    setSaving(true);
    try {
      // backend expects `assignedTo` field
      const payload = {
        title: form.title,
        description: form.description,
        status: form.status,
        assignedTo: form.employee,
      };
      await api.post("/tasks", payload);
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to create task');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" />

        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full p-2 border rounded">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} className="w-full p-2 border rounded">
          <option value="">Assign to Employee</option>
          {employees.map((emp) => (
            <option value={emp._id} key={emp._id}>{emp.name}</option>
          ))}
        </select>

        <div className="flex items-center space-x-3">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Add Task"}</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
