import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type='info') => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { id, message, type }]);
    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((s) => s.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show, remove }}>
      {children}

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {toasts.map(t => (
          <Toast key={t.id} id={t.id} type={t.type} message={t.message} onClose={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
