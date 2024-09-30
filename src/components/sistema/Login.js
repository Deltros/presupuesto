import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      navigate('/ingreso-gasto');
    }

  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const postData = {
        email: email,
        password: password
      };

      const response = await apiService.post('api/login', postData);

      localStorage.setItem('token', response.data.token);

      navigate('/ingreso-gasto');

    } catch (err) {

        if (err.response && err.response.status === 401) {
            setError(err.response.data.error); 
        } else if (err.response) {
            setError(`Error: ${err.response.status}. Inténtalo de nuevo.`);
        } else {
            setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
        }

    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Ingresar
        </Button>
      </form>
    </Box>
  );
};

export default Login;
