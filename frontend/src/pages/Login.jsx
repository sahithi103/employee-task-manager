import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  const reset = () => {
    setName(''); setEmail(''); setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        show('Logged in', 'success');
      } else {
        await register(name, email, password);
        show('Registered and logged in', 'success');
      }
      reset();
      navigate('/');
    } catch (err) {
      console.error(err);
      show(err?.response?.data?.message || (mode === 'login' ? 'Login failed' : 'Registration failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">{mode === 'login' ? 'Login' : 'Sign up'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required minLength={6} />
          </div>

          <div>
            <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded">{loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Create account')}</button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Don't have an account? <button onClick={() => setMode('register')} className="text-blue-600 underline">Sign up</button>
            </>
          ) : (
            <>
              Already registered? <button onClick={() => setMode('login')} className="text-blue-600 underline">Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
