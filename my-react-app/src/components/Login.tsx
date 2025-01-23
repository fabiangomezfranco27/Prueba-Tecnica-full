import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    TextField, Button, Typography, Box, Alert,
    Container 
} from '@mui/material';
import { authService } from '../services/authService';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Mostrar mensaje de registro exitoso si existe
        const message = location.state?.message;
        if (message) {
            setError('');
            // Puedes usar un estado separado para mensajes de éxito
            // o modificar el componente Alert para mostrar success
            console.log(message);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor ingresa email y contraseña');
            return;
        }
        
        setLoading(true);
        try {
            const response = await authService.login({ email, password });
            if (response.access_token) {
                console.log('Usuario logueado exitosamente:', response.user);
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/tasks');
            }
        } catch (err) {
            console.error('Error de login:', err);
            setError('Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        fullWidth
                        variant="text"
                        sx={{ mt: 2 }}
                    >
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;