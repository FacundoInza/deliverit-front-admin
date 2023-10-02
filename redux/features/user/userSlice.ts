import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'interfaces';
import { getUser } from './userThunk';

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
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.enabled = action.payload.enabled;
            state.lastSeenAt = action.payload.lastSeenAt;
            state.blockUntil = action.payload.blockUntil;
            state.urlImage = action.payload.urlImage;
        });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
