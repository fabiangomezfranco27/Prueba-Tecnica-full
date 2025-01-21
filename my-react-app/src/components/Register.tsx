import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, TextField, Button, Typography, 
    Box, Alert 
} from '@mui/material';
import { RegisterData } from '../types/auth';
import { registerUser } from '../services/authService';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const registerData: RegisterData = {
                username,
                email,
                password
            };
            await registerUser(registerData);
            navigate('/login', { 
                state: { message: 'Registro exitoso. Por favor inicia sesión.' }
            });
        } catch (error) {
            setError('Error en el registro');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nombre de Usuario"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
            >
                {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
            <Button
                fullWidth
                variant="text"
                onClick={handleLoginClick}
                sx={{ mt: 1 }}
            >
                ¿Ya tienes cuenta? Inicia sesión
            </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;