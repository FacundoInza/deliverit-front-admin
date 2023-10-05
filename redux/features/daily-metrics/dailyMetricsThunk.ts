import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axiosInstance';

export const getDailyMetrics = createAsyncThunk(
    'getDailyMetrics',
    async (date: string | undefined) => {
        const response = await api.get(`/api/admin/${date}`);

        if (response.status !== 200) {
            throw new Error('No se pudo obtener la información del usuario');
        }

        return response.data.data;
    }
);
