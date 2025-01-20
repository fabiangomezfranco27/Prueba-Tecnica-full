import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TaskProvider } from './contexts/TaskContext';
import { theme } from './theme/AppStyles'; // Asegúrate de importar theme
import TaskDashboard from './components/TaskDashboard';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <TaskProvider>
  <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tasks" element={<TaskDashboard />} />
                        <Route path="/tasks/new" element={<TaskForm mode="create" />} />
                        <Route path="/tasks/edit/:id" element={<TaskForm mode="edit" />} />
                        <Route path="/tasks/:id" element={<TaskDetails />} />
                        <Route path="/" element={<TaskDashboard />} />
                    </Routes>
                </TaskProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
