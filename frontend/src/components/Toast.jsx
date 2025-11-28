import { useEffect } from 'react';

const Toast = ({ id, type = 'info', message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(t);
  }, [id, onClose]);

  const bg = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-800';

  return (
    <div className={`text-white px-4 py-2 rounded shadow ${bg}`}>
      {message}
    </div>
  );
};

export default Toast;
