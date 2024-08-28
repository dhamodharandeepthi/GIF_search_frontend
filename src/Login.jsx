import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    paper: {
        padding: 3,
        width: '100%',
    },
    button: {
        marginBottom: 2,
    },
    textField: {
        marginBottom: 2,
    },
    heading: {
        marginBottom: 2,
    },
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://gif-search-app-server.onrender.com/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful!');
            setTimeout(() => navigate('/gif-search'), 1000);
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = () => navigate('/register');

    return (
        <Container component="main" maxWidth="xs" sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h5" align="center" sx={styles.heading}>
                    Login
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={styles.textField}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={styles.textField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        sx={styles.button}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
};

export default Login;
