import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axiosInstance';

interface IGetOrdersParams {
    pageNumber: number;
    selectedDate: string | undefined;
}

export const getOrders = createAsyncThunk(
    'getOrders',
    async (pageNumberAndSelectedDate: IGetOrdersParams) => {
        const response = await api.get(
            `/api/order/?page=${pageNumberAndSelectedDate.pageNumber}&deliveryDate=${pageNumberAndSelectedDate.selectedDate}`
        );

        if (response.status !== 200) {
            throw new Error('Orders request failed');
        }

        return response.data;
    }
);
