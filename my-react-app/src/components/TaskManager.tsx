import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
    CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';

const TaskManager: React.FC = () => {
    const { tasks, loading, error, createTask, deleteTask } = useTaskContext();
    const [newTask, setNewTask] = useState('');

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        
        try {
            // Obtener el userId del usuario actual
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            await createTask({
                title: newTask,
                description: '',
                dueDate: new Date().toISOString(),
                completed: false,
                userId: user.id // Agregamos el userId
            });
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gestor de Tareas
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <TextField
                        fullWidth
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Nueva tarea"
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddTask}
                    >
                        Agregar
                    </Button>
                </Box>

                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.id} divider>
                            <ListItemText primary={task.title} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => deleteTask(task.id)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default TaskManager;