import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api/axiosInstance';

interface IDeleteDeliveriesParams {
    deletedDeliveryId: string;
    userId: string;
}

export const getDeliveries = createAsyncThunk(
    'getDeliveries',
    async (workerId: string) => {
        const response = await api.get(`/api/admin/workers/${workerId}`);

        if (response.status !== 200) {
            throw new Error('Deliveries request failed');
        }

        return response.data.data;
    }
);

export const deleteDeliveries = createAsyncThunk(
    'deleteDeliveries',
    async (deletedDeliveryIdAndUserId: IDeleteDeliveriesParams, thunkAPI) => {
        await api.delete(
            `/api/delivery/${deletedDeliveryIdAndUserId.deletedDeliveryId}`
        );

        await thunkAPI.dispatch(
            getDeliveries(deletedDeliveryIdAndUserId.userId)
        );

        return;
    }
);

export const switchWorkerStatus = createAsyncThunk(
    'switchWorkerStatus',
    async (workerId: string, thunkAPI) => {
        const response = await api.put(`/api/admin/edit-status/${workerId}`);

        await thunkAPI.dispatch(getDeliveries(workerId));

        return response.data.data;
    }
);

export const cancelDeliveries = createAsyncThunk(
    'cancelDeliveries',
    async (deletedDeliveryIdAndUserId: IDeleteDeliveriesParams, thunkAPI) => {
        const response = await api.put(
            `/api/delivery/${deletedDeliveryIdAndUserId.deletedDeliveryId}`,
            {
                status: 'cancelled',
            }
        );

        await thunkAPI.dispatch(
            getDeliveries(deletedDeliveryIdAndUserId.userId)
        );

        return response.data.data;
    }
);
