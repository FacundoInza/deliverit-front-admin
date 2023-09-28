import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDailyMetrics = createAsyncThunk(
    'getDailyMetrics',
    async (date: string | undefined) => {
        const response = await axios.get(
            `http://localhost:5000/api/admin/${date}`
        );

        if (response.status !== 200) {
            throw new Error('No se pudo obtener la información del usuario');
        }

        return response.data.data;
    }
);
