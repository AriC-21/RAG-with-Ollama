import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getData = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
