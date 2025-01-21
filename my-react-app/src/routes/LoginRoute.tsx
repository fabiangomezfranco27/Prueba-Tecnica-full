import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login';

const LoginRoute: React.FC = () => {
    return (
        <Route path="/login" Component={Login} />
    );
};

export default LoginRoute;