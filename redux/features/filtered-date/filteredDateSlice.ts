import { createSlice } from '@reduxjs/toolkit';
import { dateFormatting } from '../../../utils';

const initialState = dateFormatting();

const filteredDateSlice = createSlice({
    name: 'filteredDate',
    initialState,
    reducers: {
        setFilteredDate: (state, action) => (state = action.payload),
    },
});

export const { setFilteredDate } = filteredDateSlice.actions;

export default filteredDateSlice.reducer;
