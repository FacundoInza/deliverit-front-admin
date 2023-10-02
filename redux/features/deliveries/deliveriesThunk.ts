import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { setUser } from '../user/userSlice';

interface IDeleteDeliveriesParams {
    deletedDeliveryId: string;
    userId: string;
}

export const getDeliveries = createAsyncThunk(
    'getDeliveries',
    async (workerId: string) => {
        const response = await axios.get(
            `http://localhost:5000/api/admin/workers/${workerId}`
        );

        if (response.status !== 200) {
            throw new Error('Deliveries request failed');
        }

        return response.data.data;
    }
);

export const deleteDeliveries = createAsyncThunk(
    'deleteDeliveries',
    async (deletedDeliveryIdAndUserId: IDeleteDeliveriesParams, thunkAPI) => {
        const response = await axios.delete(
            `http://localhost:5000/api/admin/delivery/delete/${deletedDeliveryIdAndUserId.deletedDeliveryId}`
        );

        await thunkAPI.dispatch(
            getDeliveries(deletedDeliveryIdAndUserId.userId)
        );

        return response.data.data;
    }
);

export const switchWorkerStatus = createAsyncThunk(
    'switchWorkerStatus',
    async (workerId: string, thunkAPI) => {
        const response = await axios.put(
            `http://localhost:5000/api/admin/edit-status/${workerId}`
        );

        const token = response.headers['authorization'];
        setCookie('token', token.slice(7));
        localStorage.setItem('token', token.slice(7));
        thunkAPI.dispatch(setUser(response.data.data));

        await thunkAPI.dispatch(getDeliveries(workerId));

        return response.data.data;
    }
);
