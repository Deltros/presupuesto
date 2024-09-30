import axios from 'axios'; 

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const get = async (endpoint) => {
    try {

        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status != 200 && response.status != 201) {
            throw new Error(`Error al consultar${endpoint}: ${response.error}`, response.status);
        }

        return response;

    } catch (error) {
        console.error('Error', error);
        return null;
    }
};

export const post = async (endpoint, postData) => {
    try {

        const headers = {};

        if (endpoint != 'api/login') { 
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }

        const response = await axios.post(`${BASE_URL}${endpoint}`, postData, {headers});

        if (response.status != 200 && response.status != 201) {
            throw new Error(`Error al consultar ${endpoint}: ${response.error}`, response.status);
        }

        return response;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default {
    get,
    post
};