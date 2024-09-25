// src/services/gastosService.js

export const fetchTiposGastos = async () => {
    try {
      const response = await fetch('http://localhost:8000/gastos/tipos');
      
      // Verificamos que la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener los tipos de gastos');
      }
      
      const data = await response.json();
  
      console.log(data);

      return data.map(item => ({
        label: item.descripcion,
        value: item.id,
      }));
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  