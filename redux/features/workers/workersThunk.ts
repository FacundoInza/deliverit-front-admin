import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axiosInstance';

export const getWorkers = createAsyncThunk(
    'getWorkers',
    async (date: string | undefined) => {
        const response = await api.get(`/api/admin/${date}/workers`);

        if (response.status !== 200) {
            throw new Error('No se pudo obtener la información del usuario');
        }

        return response.data.data;
    }
);
