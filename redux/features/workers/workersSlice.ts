import { createSlice } from '@reduxjs/toolkit';
import { IWorker } from '../../../interfaces';
import { getWorkers } from './workersThunk';

import image from '../../../assets/avatarcode.jpg';
import image2 from '../../../assets/avatarcode2.png';
import image3 from '../../../assets/avatarcode3.png';
import image4 from '../../../assets/avatarcode4.png';

const initialState: IWorker[] = [
    {
        id: '1',
        name: 'Farid',
        picture: image.src,
        workerStatus: 'active',
        createdAt: '12/12/12',
    },
    {
        id: '2',
        name: 'Luciana',
        picture: image2.src,
        workerStatus: 'active',
        createdAt: '12/12/12',
    },
    {
        id: '3',
        name: 'Dario',
        picture: image3.src,
        workerStatus: 'inactive',
        createdAt: '12/12/12',
    },
    {
        id: '4',
        name: 'Santiago',
        picture: image4.src,
        workerStatus: 'active',
        createdAt: '12/12/12',
    },
];

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWorkers.fulfilled, (state, action) => {
            state.splice(0, state.length, ...action.payload);
        });
    },
});

export default workersSlice.reducer;
