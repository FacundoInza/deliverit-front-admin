import { createSlice } from '@reduxjs/toolkit';
import { IDailyMetrics } from '../../../interfaces';
import { getDeliveries } from '../deliveries/deliveriesThunk';

const initialState: IDailyMetrics = {
    date: '12/12/12',
    activeWorkers: 3,
    deliveriesQuantity: 3,
    deliveriesCompletedQuantity: 2,
};

const dailyMetricsSlice = createSlice({
    name: 'dailyMetrics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDeliveries.fulfilled, (state, action) => {
            const arrayOfWorkers = action.payload.map(
                (delivery) => delivery.workerId
            );
            const date = action.payload[0].initialDate;
            const deliveriesQuantity = action.payload.length;
            const deliveriesCompletedQuantity = action.payload.filter(
                (delivery) => delivery.status === 'delivered'
            ).length;
            return {
                date,
                activeWorkers: [...new Set(arrayOfWorkers)].length,
                deliveriesQuantity,
                deliveriesCompletedQuantity,
            };
        });
    },
});

export default dailyMetricsSlice.reducer;
