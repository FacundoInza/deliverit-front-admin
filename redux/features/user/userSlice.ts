import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'interfaces';

const initialState: IUser = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
    enabled: false,
    lastSeenAt: new Date(),
    blockUntil: new Date(),
    urlImage: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
