import { createSlice } from '@reduxjs/toolkit';

const initialState = new Date();

const filteredDateSlice = createSlice({
    name: 'filteredDate',
    initialState,
    reducers: {
        setFilteredDate: (state, action) => (state = action.payload),
    },
});

export const { setFilteredDate } = filteredDateSlice.actions;

export default filteredDateSlice.reducer;
