import React from 'react';
import { Box, Typography } from '@mui/material';
import { authService } from '../services/authService';

const AuthStatus: React.FC = () => {
    const user = authService.getCurrentUser();

    return (
        <Box sx={{ p: 2 }}>
            <Typography>
                {user 
                    ? `Usuario actual: ${user.username || user.email}`
                    : 'No hay usuario logueado'
                }
            </Typography>
        </Box>
    );
};

export default AuthStatus; 