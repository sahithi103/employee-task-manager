import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending', employee: '' });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [tRes, eRes] = await Promise.all([api.get(`/tasks/${id}`), api.get('/employees')]);
        const task = tRes.data;
        setForm({ title: task.title, description: task.description, status: task.status, employee: task.assignedTo?._id || '' });
        setEmployees(eRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const validate = () => {
    if (!form.title) return 'Title is required';
    if (!form.employee) return 'Please assign to an employee';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return show(v, 'error');
    setLoading(true);
    try {
      await api.put(`/tasks/${id}`, { title: form.title, description: form.description, status: form.status, assignedTo: form.employee });
      show('Task updated', 'success');
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      show('Failed to update task', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />

        <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="w-full p-2 border rounded">
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select value={form.employee} onChange={(e)=>setForm({...form,employee:e.target.value})} className="w-full p-2 border rounded">
          <option value="">Assign to Employee</option>
          {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
        </select>

        <div className="flex items-center space-x-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
