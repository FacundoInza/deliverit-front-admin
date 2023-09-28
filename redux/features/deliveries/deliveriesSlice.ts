import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { getDeliveries } from './deliveriesThunk';
import { IDeliveriesPerWorker } from '../../../interfaces';

interface IDeliveriesPerWorkerState {
    data: IDeliveriesPerWorker;
    loading: boolean;
    error: SerializedError | null;
}

const initialState: IDeliveriesPerWorkerState = {
    data: {
        workerId: '',
        status: '',
        workerImage: '',
        deliveredOrders: [{ orderId: '', address: '' }],
        pendingOrders: [{ orderId: '', address: '', status: '' }],
    },
    loading: false,
    error: null,
};

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeliveries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDeliveries.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDeliveries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default deliveriesSlice.reducer;
