import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from './ordersThunk';

interface IOrdersPerWorkerState {
    data: {
        message: string;
        page: string;
        totalPages: number;
        data: Array<IOrder>;
        totalItems: number;
        itemsPerPage: number;
        prevPage: string | null;
        nextPage: string | null;
        status: number;
    };
    loading: boolean;
    error: null | string;
}

export interface IOrder {
    _id: string;
    status: string;
    address: string;
    coords: { lat: number; lng: number };
    packageQuantity: number;
    weight: number;
    recipient: string;
    deliveryDate: string;
    _v: number;
}

const initialState: IOrdersPerWorkerState = {
    data: {
        message: '',
        page: '',
        totalPages: 0,
        data: [
            {
                _id: '',
                status: '',
                address: '',
                coords: { lat: 0, lng: 0 },
                packageQuantity: 0,
                weight: 0,
                recipient: '',
                deliveryDate: '',
                _v: 0,
            },
        ],
        totalItems: 0,
        itemsPerPage: 0,
        prevPage: null,
        nextPage: null,
        status: 0,
    },
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.loading = false;
                state.error = 'Get deliveries error';
            });
    },
});

export default ordersSlice.reducer;
