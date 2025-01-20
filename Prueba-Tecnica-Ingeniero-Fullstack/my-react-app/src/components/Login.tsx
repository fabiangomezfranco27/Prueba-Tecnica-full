import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { LoginContainer } from '../theme/AppStyles';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }
            
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>

                <Button
                    fullWidth
                    variant="text"
                    onClick={() => navigate('/register')}
                >
                    ¿No tienes cuenta? Regístrate
                </Button>
            </Box>
        </LoginContainer>
    );
};

export default Login;
