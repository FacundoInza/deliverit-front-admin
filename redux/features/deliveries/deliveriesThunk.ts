import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDeliveries = createAsyncThunk(
    'getDeliveries',
    async (workerId: string) => {
        const response = await axios.get(
            `http://localhost:5000/api/admin/workers/${workerId}`
        );

        if (response.status !== 200) {
            throw new Error('No se pudo obtener la información del usuario');
        }

        return response.data.data;
    }
);
