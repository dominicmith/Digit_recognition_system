import axios from 'axios';

export const predictDigit = async (formData) => {
    const response = await axios.post('/api/predict', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
