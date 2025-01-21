// services/createTask.ts
import axios from 'axios';

interface Task {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

interface TaskResponse {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    createdAt: string;
}

const API_BASE_URL = 'http://localhost:8000/api';

const createTask = async (taskData: Task): Promise<TaskResponse> => {
    try {
        const response = await axios.post<TaskResponse>(
            `${API_BASE_URL}/tasks`,
            taskData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        throw new Error('No se pudo crear la tarea');
    }
};

export default createTask;
