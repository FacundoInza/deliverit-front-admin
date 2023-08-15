import { createSlice } from '@reduxjs/toolkit';
import { IDelivery } from '../../../interfaces';
import { getDeliveries } from './deliveriesThunk';

interface IDeliveries {
    deliveries: IDelivery[];
}

const initialState: IDeliveries = {
    deliveries: [
        {
            id: '1',
            initialDate: '12/12/12',
            startingLocation: ['23.234', '24.234'],
            address: 'Amenabar 2356',
            status: 'delivered',
            orderId: '2312',
            workerId: '1',
            resolutionDate: '12/12/12',
        },
        {
            id: '2',
            initialDate: '12/12/12',
            startingLocation: ['33.234', '34.234'],
            address: 'Amenabar 4356',
            status: 'delivered',
            orderId: '2313',
            workerId: '2',
            resolutionDate: '12/12/12',
        },
        {
            id: '3',
            initialDate: '12/12/12',
            startingLocation: ['34.234', '35.234'],
            address: 'Amenabar 4256',
            status: 'pending',
            orderId: '2314',
            workerId: '4',
            resolutionDate: '12/12/12',
        },
    ],
};

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDeliveries.fulfilled, (state, action) => {
            state.deliveries = action.payload;
        });
    },
});

export default deliveriesSlice.reducer;
