import { createSlice } from '@reduxjs/toolkit';
import { IPackage } from '../../../interfaces';
import { v4 as uuidv4 } from 'uuid';

interface IPackages {
    allPackages: IPackage[];
}

const initialState: IPackages = {
    allPackages: [
        {
            id: uuidv4(),
            address: 'Amenabar 2356',
            city: 'CABA',
            available: true,
            quantity: 2,
        },
        {
            id: uuidv4(),
            address: 'Av Carabobo y Rivadavia',
            city: 'CABA',
            available: true,
            quantity: 4,
        },
        {
            id: uuidv4(),
            address: 'Melian 1242',
            city: 'CABA',
            available: true,
            quantity: 1,
        },
        {
            id: uuidv4(),
            address: 'Castillo 670',
            city: 'CABA',
            available: true,
            quantity: 2,
        },
        {
            id: uuidv4(),
            address: 'Gorriti 4595',
            city: 'CABA',
            available: false,
            quantity: 3,
        },
        {
            id: uuidv4(),
            address: 'Av. Gral. Mosconi 1056',
            city: 'CABA',
            available: false,
            quantity: 1,
        },
        {
            id: uuidv4(),
            address: 'Tacuarí 1797',
            city: 'CABA',
            available: false,
            quantity: 1,
        },
    ],
};

const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {
            const id = action.payload.id;
            const packageIndex = state.allPackages.findIndex(
                (pkg) => pkg.id === id
            );
            if (packageIndex !== -1) {
                state.allPackages[packageIndex].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload.id;
            const packageIndex = state.allPackages.findIndex(
                (pkg) => pkg.id === id && pkg.quantity > 1
            );
            if (packageIndex !== -1) {
                state.allPackages[packageIndex].quantity -= 1;
            }
        },
    },
});

export const { increaseQuantity, decreaseQuantity } = packagesSlice.actions;
export default packagesSlice.reducer;
