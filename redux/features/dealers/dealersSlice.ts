import { createSlice } from '@reduxjs/toolkit';
import { IDealer } from '../../../interfaces';
import { v4 as uuidv4 } from 'uuid';

import image from '../../../assets/avatarcode.jpg';
import image2 from '../../../assets/avatarcode2.png';
import image3 from '../../../assets/avatarcode3.png';
import image4 from '../../../assets/avatarcode4.png';

interface IDealers {
    allDealers: IDealer[];
}

const initialState: IDealers = {
    allDealers: [
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Luciana',
            lastName: '',
            urlImage: image2.src,
            workState: 'delivered',
            totalPackages: 10,
            deliveredPackages: 10,
        },
        {
            id: uuidv4(),
            name: 'Dario',
            lastName: '',
            urlImage: image3.src,
            workState: 'pending',
            totalPackages: 10,
            deliveredPackages: 8,
        },
        {
            id: uuidv4(),
            name: 'Santiago',
            lastName: '',
            urlImage: image4.src,
            workState: 'inactive',
            totalPackages: 0,
            deliveredPackages: 0,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
        {
            id: uuidv4(),
            name: 'Farid',
            lastName: '',
            urlImage: image.src,
            workState: 'pending',
            totalPackages: 9,
            deliveredPackages: 5,
        },
    ],
};

const dealersSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {},
});

export default dealersSlice.reducer;
