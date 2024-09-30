import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchTiposGastos } from '../services/gastosService';
import apiService from '../services/apiService';

const IngresoGasto = () => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaGasto, setFechaGasto] = useState('');
  const [tipoGasto, setTipoGasto] = useState(null);
  const [tiposGastos, setTiposGastos] = useState([]); 

  useEffect(() => {
    const obtenerTiposGastos = async () => {
      const response = await fetchTiposGastos();
      setTiposGastos(response);
    };

    obtenerTiposGastos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postData = {
      descripcion: descripcion,
      valor: parseFloat(monto),
      tarjeta_id: 2,
      fecha_gasto: fechaGasto,
      tipo_gasto_id: tipoGasto.value
    };
  
    const response = await apiService.post('gastos/añadir', postData);

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
          options={tiposGastos}
          getOptionLabel={(option) => option.label}
          value={tipoGasto}
          onChange={(e, newValue) => setTipoGasto(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Tipo" margin="normal" />
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
