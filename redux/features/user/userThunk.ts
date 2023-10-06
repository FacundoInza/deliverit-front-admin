import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserFromClient } from '../../../adapters/userAdapters';

export const getUser = createAsyncThunk('getUser', async () => {
    const user = await getUserFromClient();

    if (!user) {
        throw new Error('User data could not be retrieved');
    }

    return user;
});
