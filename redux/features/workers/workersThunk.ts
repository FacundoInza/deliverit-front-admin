import { createAsyncThunk } from '@reduxjs/toolkit';
import { IWorker } from '../../../interfaces';
import image from '../../../assets/avatarcode.jpg';
import image2 from '../../../assets/avatarcode2.png';
import image3 from '../../../assets/avatarcode3.png';
import image4 from '../../../assets/avatarcode4.png';

export const getWorkers = createAsyncThunk('workers/getWorkers', async () => {
    //const response = await fetch(`http://localhost:5000/admin/workers/all`);
    //const data: IWorker[] = await response.json();

    const testData: IWorker[] = [
        {
            id: '5',
            name: 'Farid',
            picture: image.src,
            workerStatus: 'active',
            createdAt: '12/12/12',
        },
        {
            id: '6',
            name: 'Luciana',
            picture: image2.src,
            workerStatus: 'active',
            createdAt: '12/12/12',
        },
        {
            id: '7',
            name: 'Dario',
            picture: image3.src,
            workerStatus: 'inactive',
            createdAt: '12/12/12',
        },
        {
            id: '8',
            name: 'Santiago',
            picture: image4.src,
            workerStatus: 'active',
            createdAt: '12/12/12',
        },
    ];
    return testData;
});
