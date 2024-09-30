import apiService from './apiService';

export const fetchTiposGastos = async () => {
    try {

      const response = await apiService.get('gastos/tipos');
      
      const data = response.data;
    
      return data.map(item => ({
        label: item.descripcion,
        value: item.id,
      }));

    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  