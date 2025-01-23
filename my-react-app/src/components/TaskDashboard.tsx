import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Grid, Typography, Button, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Box, Card, CardMedia, CardContent, Avatar, Divider, Alert
} from '@mui/material';
import { Add as AddIcon, Person as PersonIcon } from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import AuthStatus from './AuthStatus';
import { Task } from '../types/Task';
import axios from 'axios';

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
}

const TaskDashboard: React.FC = () => {
    const { tasks, loading, error, deleteTask } = useTaskContext();
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [charactersLoading, setCharactersLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        fetchRickAndMortyCharacters();
    }, []);

    const fetchRickAndMortyCharacters = async () => {
        try {
            setCharactersLoading(true);
            const response = await axios.get('https://rickandmortyapi.com/api/character');
            setCharacters(response.data.results.slice(0, 3));
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setCharactersLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleDeleteClick = (taskId: number) => {
        setDeleteTaskId(taskId);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (deleteTaskId) {
            await deleteTask(deleteTaskId);
            setOpenDialog(false);
            setDeleteTaskId(null);
        }
    };

    const handleDeleteCancel = () => {
        setOpenDialog(false);
        setDeleteTaskId(null);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                {/* Header con información de usuario */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 4,
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1
                }}>
                    <Typography variant="h4">Panel de Control</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <PersonIcon />
                        </Avatar>
                        <Typography>{user.username || user.email}</Typography>
                        <Button variant="outlined" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Box>

                {/* Estado de Autenticación */}
                <AuthStatus />
                <Divider sx={{ my: 3 }} />

                {/* Sección de Rick and Morty */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Personajes de Rick and Morty
                    </Typography>
                    <Grid container spacing={3}>
                        {charactersLoading ? (
                            <CircularProgress />
                        ) : (
                            characters.map((character) => (
                                <Grid item xs={12} sm={4} key={character.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={character.image}
                                            alt={character.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{character.name}</Typography>
                                            <Typography color="textSecondary">
                                                Status: {character.status}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Sección de Tareas */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h5">Mis Tareas</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/tasks/new')}
                    >
                        Nueva Tarea
                    </Button>
                </Box>

                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <Grid container spacing={3}>
                        {tasks.map((task) => (
                            <Grid item xs={12} sm={6} md={4} key={task.id}>
                                <TaskCard
                                    task={task}
                                    onDelete={() => handleDeleteClick(task.id)}
                                    onEdit={() => navigate(`/tasks/edit/${task.id}`)}
                                    onView={() => navigate(`/tasks/${task.id}`)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Diálogo de confirmación para eliminar */}
                <Dialog open={openDialog} onClose={handleDeleteCancel}>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogContent>
                        ¿Estás seguro de que deseas eliminar esta tarea?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel}>Cancelar</Button>
                        <Button onClick={handleDeleteConfirm} color="error">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default TaskDashboard;