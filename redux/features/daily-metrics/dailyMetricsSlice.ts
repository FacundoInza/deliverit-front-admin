import { createSlice } from '@reduxjs/toolkit';
import { IDailyMetrics } from '../../../interfaces';

const initialState: IDailyMetrics = {
    deliveredOrders: 0,
    availableOrders: 0,
    availableWorkers: 0,
    activeWorkers: { total: 0, images: [{ id: '', urlImage: '' }] },
};

const dailyMetricsSlice = createSlice({
    name: 'dailyMetrics',
    initialState,
    reducers: {
        setDailyMetrics: (state, action) => (state = action.payload),
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getDeliveries.fulfilled, (state, action) => {
    //         const arrayOfWorkers = action.payload.map(
    //             (delivery) => delivery.workerId
    //         );
    //         const date = action.payload[0].initialDate;
    //         const deliveriesQuantity = action.payload.length;
    //         const deliveriesCompletedQuantity = action.payload.filter(
    //             (delivery) => delivery.status === 'delivered'
    //         ).length;
    //         return {
    //             date,
    //             activeWorkers: [...new Set(arrayOfWorkers)].length,
    //             deliveriesQuantity,
    //             deliveriesCompletedQuantity,
    //         };
});
//     },
// });

export const { setDailyMetrics } = dailyMetricsSlice.actions;

export default dailyMetricsSlice.reducer;
