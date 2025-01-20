import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import api from '../services/api';

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data as string[]);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (!newTask) {
            return;
        }

        try {
            await axios.post('/api/tasks', { task: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (taskToDelete: string) => {
        try {
            await axios.delete(`/api/tasks/${taskToDelete}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h1>Gestor de Tareas</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nueva tarea"
                />
            <button onClick={addTask}>"Agregar Tarea"</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task}>
                        {task}
                        <button onClick={() => deleteTask(task)}>"Eliminar"</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;