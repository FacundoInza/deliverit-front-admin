import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { IDailyMetrics } from '../../../interfaces';
import { getDailyMetrics } from './dailyMetricsThunk';

interface IDailyMetricsState {
    data: IDailyMetrics;
    loading: boolean;
    error: SerializedError | null;
}

const initialState: IDailyMetricsState = {
    data: {
        deliveredOrders: 0,
        availableOrders: 0,
        availableWorkers: 0,
        activeWorkers: { total: 0, images: [{ id: '', urlImage: '' }] },
    },
    loading: false,
    error: null,
};

const dailyMetricsSlice = createSlice({
    name: 'dailyMetrics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDailyMetrics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDailyMetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDailyMetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export default dailyMetricsSlice.reducer;
