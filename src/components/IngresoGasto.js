import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchTiposGastos } from '../services/gastosService';
import axios from 'axios';


const IngresoGasto = () => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaGasto, setFechaGasto] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [opciones, setOpciones] = useState([]); 

  useEffect(() => {
    const obtenerTiposGastos = async () => {
      const tiposGastos = await fetchTiposGastos();
      setOpciones(tiposGastos);
    };

    obtenerTiposGastos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const gastoData = {
      descripcion: descripcion,
      valor: parseFloat(monto),
      tarjeta_id: 2,
      fecha_gasto: fechaGasto,
    };
  
    try {
      const response = await axios.post('http://localhost:8000/gastos/añadir', gastoData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      console.log('Respuesta del servidor:', response.data); // Manejo de la respuesta del servidor
  
      // Limpiar el formulario después de ingresar el gasto
      setMonto('');
      setDescripcion('');
      setCategoria(null);
      
    } catch (error) {
      console.error('Error al enviar el gasto:', error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <h2>Ingreso Gasto</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Monto"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descripción"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Fecha gasto"
          type="date"
          value={fechaGasto}
          onChange={(e) => setFechaGasto(e.target.value)}
          margin="normal"
          required
        />
        <Autocomplete
          options={opciones}
          getOptionLabel={(option) => option.label}
          value={categoria}
          onChange={(e, newValue) => setCategoria(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Categoría" margin="normal" />
          )}
          filterSelectedOptions
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Ingresar Gasto
        </Button>
      </form>
    </Box>
  );
};

export default IngresoGasto;
