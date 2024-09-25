import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import { fetchTiposGastos } from '../services/gastosService';

const IngresoGasto = () => {
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [opciones, setOpciones] = useState([]); 

  useEffect(() => {
    const obtenerTiposGastos = async () => {
      const tiposGastos = await fetchTiposGastos();
      setOpciones(tiposGastos);
    };

    obtenerTiposGastos();
  }, []);
  // Opciones para el Autocomplete (puedes reemplazarlas con tus propias categorías)
  /*const opciones = [
    { label: 'Opción 1', value: 'opcion1' },
    { label: 'Opción 2', value: 'opcion2' },
    { label: 'Opción 3', value: 'opcion3' },
    { label: 'Opción 4', value: 'opcion4' },
    { label: 'Opción 5', value: 'opcion5' },
    { label: 'Opción 6', value: 'opcion6' },
    { label: 'Opción 7', value: 'opcion7' },
    { label: 'Opción 8', value: 'opcion8' },
    { label: 'Opción 9', value: 'opcion9' },
    { label: 'Opción 10', value: 'opcion10' },
  ];*/

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el formulario, por ahora solo lo muestra en consola
    console.log({
      monto,
      descripcion,
      categoria,
    });

    // Limpiar el formulario después de ingresar el gasto
    setMonto('');
    setDescripcion('');
    setCategoria(null);
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
        <Autocomplete
          options={opciones}
          getOptionLabel={(option) => option.label}
          value={categoria}
          onChange={(e, newValue) => setCategoria(newValue)} // Almacena el valor seleccionado
          renderInput={(params) => (
            <TextField {...params} label="Categoría" margin="normal" required />
          )}
          filterSelectedOptions // Para filtrar opciones seleccionadas previamente
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Ingresar Gasto
        </Button>
      </form>
    </Box>
  );
};

export default IngresoGasto;
