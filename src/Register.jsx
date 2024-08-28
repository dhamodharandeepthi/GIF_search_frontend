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

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('https://gif-search-app-server.onrender.com/auth/register', { username, password });
            toast.success('Registration successful!');
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
    };

    const handleLoginRedirect = () => navigate('/login');

    return (
        <Container component="main" maxWidth="xs" sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h5" align="center" sx={styles.heading}>
                    Register
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
                        onClick={handleRegister}
                        sx={styles.button}
                    >
                        Register
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLoginRedirect}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
            <ToastContainer />
        </Container>
    );
};

export default Register;
