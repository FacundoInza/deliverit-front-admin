import { createSlice } from '@reduxjs/toolkit';
import { IDealer } from '../../../interfaces';

const initialState: IDealer[] = [];

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        setWorkers: (state, action) => (state = action.payload),
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getWorkers.fulfilled, (state, action) => {
    //         state.splice(0, state.length, ...action.payload);
    //     });
    // },
});

export const { setWorkers } = workersSlice.actions;

export default workersSlice.reducer;
