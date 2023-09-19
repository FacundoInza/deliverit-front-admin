import { createSlice } from '@reduxjs/toolkit';
import { IDeliveriesPerWorker } from '../../../interfaces';

const initialState: IDeliveriesPerWorker = {
    workerId: '',
    status: '',
    urlImage: '',
    deliveredOrders: [],
    pendingOrders: [],
};

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {
        setDeliveries: (state, action) => (state = action.payload),
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getDeliveries.fulfilled, (state, action) => {
    //         state.deliveries = action.payload;
    //     });
    // },
});

export const { setDeliveries } = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
