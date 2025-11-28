import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Navbar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const trimmed = q.trim();
    // route to tasks with query param
    navigate(`/tasks${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`);
  };
  const { user, logout } = useAuth();
  const { show } = useToast();

  const handleLogout = () => {
    logout();
    show('Logged out', 'success');
    navigate('/login');
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Employee Task Manager</h1>
      </div>

      <div className="flex items-center space-x-4">
        <form onSubmit={onSearch} className="hidden sm:flex items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks..."
            className="px-3 py-1 rounded-l bg-white text-black w-56 focus:outline-none"
          />
          <button className="px-3 py-1 rounded-r bg-white/10 hover:bg-white/20">Search</button>
        </form>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <div className="hidden sm:block text-sm text-white/90">{user.name}</div>
              <button onClick={handleLogout} className="px-3 py-1 bg-white/10 rounded">Logout</button>
            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={()=>navigate('/login')} className="px-3 py-1 bg-white/10 rounded">Login</button>
              <button onClick={()=>navigate('/register')} className="px-3 py-1 bg-white/10 rounded">Register</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
