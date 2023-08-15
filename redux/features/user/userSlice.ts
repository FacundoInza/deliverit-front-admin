import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces';

const initialState: IUser = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    picture: '',
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, lastName, email, picture, role } = action.payload;
            state.id = id;
            state.name = name;
            state.lastName = lastName;
            state.email = email;
            state.picture = picture;
            state.role = role;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
