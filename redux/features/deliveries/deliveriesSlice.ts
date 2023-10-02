import { createSlice } from '@reduxjs/toolkit';
import {
    deleteDeliveries,
    getDeliveries,
    switchWorkerStatus,
} from './deliveriesThunk';
import { IDeliveriesPerWorker } from '../../../interfaces';

interface IDeliveriesPerWorkerState {
    data: IDeliveriesPerWorker;
    loading: boolean;
    error: null | string;
}

const initialState: IDeliveriesPerWorkerState = {
    data: {
        workerId: '',
        status: '',
        urlImage: '',
        deliveredOrders: [{ deliveryId: '', address: '' }],
        pendingOrders: [{ deliveryId: '', address: '', status: '' }],
    },
    loading: false,
    error: null,
};

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {
        deletePendingOrderFromReduxState: (state, action) => {
            state.data.pendingOrders = state.data.pendingOrders.filter(
                (order) => order.deliveryId !== action.payload
            );
        },
        deleteDeliveredOrderFromReduxState: (state, action) => {
            state.data.deliveredOrders = state.data.deliveredOrders.filter(
                (order) => {
                    return order.deliveryId !== action.payload;
                }
            );
        },
        removeError: (state) => {
            state.error = null;
        },
        switchStatusOptimistic: (state) => {
            state.data.status =
                state.data.status === 'active' ? 'inactive' : 'active';
        },
    },
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
            .addCase(getDeliveries.rejected, (state) => {
                state.loading = false;
                state.error = 'Get deliveries error';
            })
            .addCase(deleteDeliveries.rejected, (state) => {
                state.loading = false;
                state.error = 'Delete delivery error';
            })
            .addCase(switchWorkerStatus.fulfilled, (state, action) => {
                state.data.status = action.payload.enabled
                    ? 'active'
                    : 'inactive';
            })
            .addCase(switchWorkerStatus.rejected, (state) => {
                state.error = 'Switch status error';
            });
    },
});

export const {
    deletePendingOrderFromReduxState,
    deleteDeliveredOrderFromReduxState,
    removeError,
    switchStatusOptimistic,
} = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
