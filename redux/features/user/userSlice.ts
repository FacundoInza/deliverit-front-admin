import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../interfaces';

const initialState: IUser = {
    id: '',
    name: '',
    urlImage: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, urlImage } = action.payload;
            state.id = id;
            state.name = name;
            state.urlImage = urlImage;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
