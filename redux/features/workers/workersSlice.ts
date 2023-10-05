import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { getWorkers } from './workersThunk';
import { IDealer } from '../../../interfaces';

interface IWorkerState {
    data: IDealer[];
    loading: boolean;
    error: SerializedError | null;
}

const initialState: IWorkerState = {
    data: [
        {
            workerName: '',
            workerId: '',
            workerImage: '',
            status: '',
            percentage: 0,
        },
    ],
    loading: false,
    error: null,
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        switchWorkerStatusInWorkersArray: (state, action) => {
            const { workerId, workerStatus } = action.payload;

            state.data.map((worker) => {
                if (worker.workerId === workerId) worker.status = workerStatus;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWorkers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { switchWorkerStatusInWorkersArray } = workersSlice.actions;

export default workersSlice.reducer;
