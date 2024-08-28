import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Card, CardMedia, CardContent, Typography, IconButton, Box, Container, Divider, Button, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// constant
const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

// styles
const styles = {
  container: {
    paddingY: 4,
  },
  appBar: {
    marginBottom: 4,
  },
  searchField: {
    backgroundColor: 'white',
    borderRadius: 1,
    marginRight: 2,
  },
  favoritesBox: {
    backgroundColor: '#f5f5f5',
    padding: 2,
    borderRadius: 2,
  },
  card: {
    boxShadow: 3,
    borderRadius: 2,
    marginBottom: 2,
  },
  cardMedia: {
    objectFit: 'cover',
    borderRadius: '0 0 10px 10px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 4,
  },
};

// app
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchGifs = async (query, page) => {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: API_KEY,
          q: query,
          limit,
          offset,
        },
      });
      setGifs(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total_count / limit));
    } catch (error) {
      toast.error('Failed to fetch GIFs. Please try again.');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchGifs(searchTerm, value);
  };

  const toggleFavorite = (gif) => {
    const updatedFavorites = favorites.some(fav => fav.id === gif.id)
      ? favorites.filter(fav => fav.id !== gif.id)
      : [...favorites, gif];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (gif) => favorites.some(fav => fav.id === gif.id);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <AppBar position="static" color="primary" sx={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            GIF Search App
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search GIFs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={() => fetchGifs(searchTerm, page)}
            sx={styles.searchField}
          />
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>Favorites</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={styles.favoritesBox}>
              {favorites.length > 0 ? (
                favorites.map(gif => (
                  <Card key={gif.id} sx={styles.card}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={gif.images.fixed_height.url}
                      alt={gif.title}
                      sx={styles.cardMedia}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {gif.title}
                      </Typography>
                      <IconButton onClick={() => toggleFavorite(gif)} color="error">
                        <Favorite />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No favorites selected yet.
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>Search Results</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {gifs.map(gif => (
                <Grid item xs={12} sm={6} md={4} key={gif.id}>
                  <Card sx={styles.card}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={gif.images.fixed_height.url}
                      alt={gif.title}
                      sx={styles.cardMedia}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {gif.title}
                      </Typography>
                      <IconButton onClick={() => toggleFavorite(gif)} color="error">
                        {isFavorite(gif) ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={styles.paginationContainer}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ToastContainer />
    </Container>
  );
};

// protection route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// main app
const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/gif-search"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default MainApp;
