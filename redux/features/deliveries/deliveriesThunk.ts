import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDelivery } from '../../../interfaces';

export const getDeliveries = createAsyncThunk(
    'deliveries/getDeliveries',
    async (date: Date) => {
        const response = await fetch(
            `http://localhost:5000/admin/deliveries/${date}`
        );
        const data: IDelivery[] = await response.json();

        return data;
    }
);
