import React from 'react';
import { Task } from '../types/Task';
import { 
    Card, CardContent, CardActions, Typography, 
    Button, Chip, Box 
} from '@mui/material';
import { 
    Edit as EditIcon, 
    Delete as DeleteIcon,
    Visibility as VisibilityIcon 
} from '@mui/icons-material';

interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onEdit: () => void;
    onView: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, onView }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {task.description.length > 100
                        ? `${task.description.substring(0, 100)}...`
                        : task.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" display="block">
                        Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                    <Chip
                        label={task.completed ? "Completada" : "Pendiente"}
                        color={task.completed ? "success" : "error"}
                        size="small"
                        sx={{ mt: 1 }}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={onView}
                >
                    Ver
                </Button>
                <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={onEdit}
                >
                    Editar
                </Button>
                <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={onDelete}
                >
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};

export default TaskCard;