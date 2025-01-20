import React from 'react';
import { Route } from 'react-router-dom';
import TaskManager from '../components/TaskManager';
import TaskDashboard from '../components/TaskDashboard';
import TaskDetails from '../components/TaskDetails';

const TaskManagerRoute: React.FC = () => {
    return (
        <Route path="/task-manager" element={<TaskManager />} />

    );
};

export default TaskManagerRoute;