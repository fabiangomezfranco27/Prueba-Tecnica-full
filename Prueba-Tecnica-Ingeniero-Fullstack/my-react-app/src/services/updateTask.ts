// services/updateTask.ts
import axios from 'axios';

const updateTask = async (taskId: number, taskData: any) => {
  try {
    const response = await axios.put(`http://your-api-endpoint.com/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export default updateTask;
