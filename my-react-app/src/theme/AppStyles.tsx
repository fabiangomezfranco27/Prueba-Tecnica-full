import { createTheme, styled } from '@mui/material/styles';
import { Container, Box, Paper } from '@mui/material';
import '@fontsource/roboto'; // Importa la fuente por defecto de MUI

// Definición del tema
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#ffffff'
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    minHeight: '100vh'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingTop: '24px',
                    paddingBottom: '24px'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }
                }
            }
        }
    }
});

// Componentes estilizados
export const LoginContainer = styled(Container)(({ theme }) => ({    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    background: theme.palette.background.default
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%'
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6),
    }
}));

export const FormBox = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(2)
    },
    '& .MuiButton-root': {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1.5),
        fontSize: '1rem'
    }
}));
export const MainContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
}));
