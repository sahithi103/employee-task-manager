import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", position: "", department: "", role: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/employees", form);
      navigate("/employees");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full p-2 border rounded" />
        <input required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position" className="w-full p-2 border rounded" />
        <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Department" className="w-full p-2 border rounded" />
        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="w-full p-2 border rounded" />

        <div className="flex items-center space-x-3">
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
            {saving ? "Saving..." : "Add Employee"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
