import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';
import { Task } from '../types/Task';

interface TaskManagerContainerProps {
    children: React.ReactNode;
}

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (task: Omit<Task, 'id'>) => Promise<Task>;  // Cambiado a Promise<Task>
    updateTask: (id: number, task: Partial<Task>) => Promise<Task>;  // Cambiado a Promise<Task>
    deleteTask: (id: number) => Promise<void>;
}

export const TaskContext = React.createContext<TaskContextType | null>(null);

const TaskManagerContainer: React.FC<TaskManagerContainerProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get<Task[]>('/api/tasks');
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError("Error al cargar las tareas");
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
        try {
            const response = await api.post<Task>('/api/tasks', task);
            setTasks(prev => [...prev, response.data]);
            return response.data;
        } catch (err) {
            setError('Error al crear la tarea');
            throw err;
        }
    };

    const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
        try {
            const response = await api.put<Task>(`/api/tasks/${id}`, task);
            setTasks(prev => prev.map(t => t.id === id ? response.data : t));
            return response.data;
        } catch (err) {
            setError("Error al actualizar la tarea");
            throw err;
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await api.delete(`/api/tasks/${id}`);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError("Error al eliminar la tarea");
            throw err;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const contextValue: TaskContextType = {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
    };

    return (
        <TaskContext.Provider value={contextValue}>
            <Container>
                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
                {children}
            </Container>
        </TaskContext.Provider>
    );
};

export default TaskManagerContainer;