import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la ruta raíz al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas */}
        <Route path="/tasks/*" element={<TaskManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;