import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskDashboard from './components/TaskDashboard';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

const Routes: React.FC = () => {
    return (
        <RouterRoutes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route path="/tasks" element={
                <PrivateRoute>
                    <TaskDashboard />
                </PrivateRoute>
            } />
            <Route path="/tasks/new" element={
                <PrivateRoute>
                    <TaskForm mode="create" />
                </PrivateRoute>
            } />
            <Route path="/tasks/edit/:id" element={
                <PrivateRoute>
                    <TaskForm mode="edit" />
                </PrivateRoute>
            } />
            <Route path="/tasks/:id" element={
                <PrivateRoute>
                    <TaskDetails />
                </PrivateRoute>
            } />

            {/* Ruta por defecto */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </RouterRoutes>
    );
};

export default Routes;