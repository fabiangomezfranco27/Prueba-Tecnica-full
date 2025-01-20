// services/getTask.ts
import axios from 'axios';

const getTask = async (taskId: number) => {
  try {
    const response = await axios.get(`http://your-api-endpoint.com/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting task:', error);
    throw error;
  }
};

export default getTask;
