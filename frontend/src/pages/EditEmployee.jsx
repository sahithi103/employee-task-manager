import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
  const [form, setForm] = useState({ name: '', email: '', position: '', department: '', role: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/employees/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const validate = () => {
    if (!form.name) return 'Name is required';
    if (!form.email) return 'Email is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return show(v, 'error');
    setLoading(true);
    try {
      await api.put(`/employees/${id}`, form);
      show('Employee updated', 'success');
      navigate('/employees');
    } catch (err) {
      console.error(err);
      show('Failed to update employee', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={form.position} onChange={(e)=>setForm({...form,position:e.target.value})} placeholder="Position" className="w-full p-2 border rounded" />
        <input value={form.department} onChange={(e)=>setForm({...form,department:e.target.value})} placeholder="Department" className="w-full p-2 border rounded" />
        <input value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} placeholder="Role" className="w-full p-2 border rounded" />

        <div className="flex items-center space-x-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
