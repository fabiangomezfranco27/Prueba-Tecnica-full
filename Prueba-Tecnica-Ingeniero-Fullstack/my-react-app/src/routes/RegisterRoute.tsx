import React from 'react';
import { Route } from 'react-router-dom';
import Register from '../components/Register';

const RegisterRoute: React.FC = () => {
    return (
        <Route path="/register" Component={Register} />
    );
};

export default RegisterRoute;