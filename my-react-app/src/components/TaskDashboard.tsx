import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Grid, Typography, Button, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Box
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import { Task } from '../types/Task';

const TaskDashboard: React.FC = () => {
    const { tasks, loading, error, deleteTask } = useTaskContext();
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (deleteTaskId) {
            await deleteTask(deleteTaskId);
            setDeleteTaskId(null);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" m={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">Mis Tareas</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/tasks/new')}
                >
                    Crear Tarea
                </Button>
            </Box>

            {error && (
                <Typography color="error" mb={2}>
                    {error}
                </Typography>
            )}

            {tasks.length === 0 ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h6" color="textSecondary">
                        No hay tareas disponibles
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {tasks.map((task: Task) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <TaskCard
                                task={task}
                                onDelete={() => setDeleteTaskId(task.id)}
                                onEdit={() => navigate(`/tasks/edit/${task.id}`)}
                                onView={() => navigate(`/tasks/${task.id}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog
                open={deleteTaskId !== null}
                onClose={() => setDeleteTaskId(null)}
            >
                <DialogTitle>
                    Confirmar eliminación
                </DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar esta tarea?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteTaskId(null)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskDashboard;