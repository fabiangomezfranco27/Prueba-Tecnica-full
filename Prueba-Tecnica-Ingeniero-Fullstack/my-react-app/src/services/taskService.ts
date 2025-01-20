import api from './api';
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/Task';

const taskService = {
    getTasks: async () => {
        try {
            const response = await api.get<Task[]>('/tasks');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener las tareas');
        }
    },

    getTask: async (id: number) => {
        try {
            const response = await api.get<Task>(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener la tarea ${id}`);
        }
    },

    createTask: async (task: CreateTaskDto) => {
        try {
            const response = await api.post<Task>('/tasks', task);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear la tarea');
        }
    },

    updateTask: async (id: number, task: UpdateTaskDto) => {
        try {
            const response = await api.put<Task>(`/tasks/${id}`, task);
            return response.data;
        } catch (error) {
            throw new Error(`Error al actualizar la tarea ${id}`);
        }
    },

    deleteTask: async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`);
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar la tarea ${id}`);
        }
    }
};

export default taskService;