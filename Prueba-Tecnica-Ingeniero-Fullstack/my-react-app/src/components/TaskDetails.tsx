import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useTaskContext } from '../contexts/TaskContext'; // Importamos el contexto
import { format } from 'date-fns';
import { Task } from '../types/Task'; // O la ruta correcta según tu estructura de carpetas

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, loading, error } = useTaskContext(); // Usamos el contexto
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const taskId = parseInt(id);
      const fetchedTask = tasks.find((task) => task.id === taskId);

      if (fetchedTask) {
        setTask(fetchedTask);
      } else {
        setTask(null);
      }
    }
  }, [id, tasks]); // Dependemos de tasks para que se actualice cuando cambie

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!task) {
    return <Typography color="error">Tarea no encontrada.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Fecha de Vencimiento: {format(new Date(task.dueDate), 'dd/MM/yyyy')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {task.completed ? (
            <Box display="flex" alignItems="center">
              <CheckCircle color="success" />
              Completada
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <RadioButtonUnchecked color="error" />
              Pendiente
            </Box>
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default TaskDetails;