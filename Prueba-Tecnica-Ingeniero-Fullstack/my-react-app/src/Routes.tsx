import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import TaskDashboard from './components/TaskDashboard';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';

const Routes: React.FC = () => {
    return (
        <RouterRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskDashboard />} />
            <Route path="/tasks/new" element={<TaskForm mode="create" />} />
            <Route path="/tasks/edit/:id" element={<TaskForm mode="edit" />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/" element={<TaskDashboard />} />
        </RouterRoutes>
    );
};

export default Routes;