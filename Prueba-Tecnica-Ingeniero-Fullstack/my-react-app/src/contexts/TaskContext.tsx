import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { Task } from '../types/Task';

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (task: Omit<Task, 'id'>) => Promise<void>;
    updateTask: (id: number, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

interface TaskProviderProps {
    children: React.ReactNode;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
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
            setError('Error al cargar las tareas');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (task: Omit<Task, 'id'>) => {
        try {
            const response = await api.post<Task>('/api/tasks', task);
            setTasks(prev => [...prev, response.data]);
        } catch (err) {
            setError('Error al crear la tarea');
            throw err;
        }
    };

    const updateTask = async (id: number, task: Partial<Task>) => {
        try {
            const response = await api.put<Task>(`/api/tasks/${id}`, task);
            setTasks(prev => prev.map(t => t.id === id ? response.data : t));
        } catch (err) {
            setError('Error al actualizar la tarea');
            throw err;
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await api.delete(`/api/tasks/${id}`);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError('Error al eliminar la tarea');
            throw err;
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const value: TaskContextType = {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
    }
    return context;
};

export default TaskContext;