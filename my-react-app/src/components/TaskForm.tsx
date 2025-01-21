import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    TextField, Button, Checkbox, FormControlLabel, 
    Container, Typography, Box, Alert 
} from '@mui/material';
import { CreateTaskDto } from '../types/Task';
import taskService from '../services/taskService';

interface TaskFormProps {
    mode: 'create' | 'edit';
}

interface TaskFormData {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
}

interface FormErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        completed: false
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const fetchTask = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const taskData = await taskService.getTask(parseInt(id, 10));
            setFormData(taskData);
        } catch (err) {
            setApiError('Error al cargar la tarea');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (mode === 'edit' && id) {
            fetchTask();
        }
    }, [mode, id, fetchTask]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'El título es requerido';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es requerida';
        }
        if (!formData.dueDate) {
            newErrors.dueDate = 'La fecha límite es requerida';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        setLoading(true);
        if (mode === 'edit' && id) {
            await taskService.updateTask(parseInt(id, 10), { ...formData, id: parseInt(id, 10) });
        } else {
            const createTaskDto: CreateTaskDto = {
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                completed: formData.completed
            };
            await taskService.createTask(createTaskDto);
        }
        navigate('/tasks');
    } catch (err) {
        setApiError('Error al guardar la tarea');
    } finally {
        setLoading(false);
    }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {mode === 'edit' ? 'Editar Tarea' : 'Nueva Tarea'}
                </Typography>

                {apiError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {apiError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Título"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        label="Descripción"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
        margin="normal"
        required
        fullWidth
        id="dueDate"
        label="Fecha límite"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        error={!!errors.dueDate}
        helperText={errors.dueDate}
        InputLabelProps={{
            shrink: true
        }}
    />
    <FormControlLabel
        control={
            <Checkbox
                checked={formData.completed}
                onChange={handleChange}
                name="completed"
            />
        }
        label="Completada"
    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? 'Guardando...' : mode === 'edit' ? 'Actualizar' : 'Crear'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default TaskForm;