import React from 'react';
import axios from 'axios';
import 'swiper/css';
import { IndividualWorker } from '../../../../components/ui/individual-worker/IndividualWorker';

interface IndividualWorkerParams {
    params: {
        id: string;
    };
}

const getIndividualWorkerDataFromServer = async (workerId: string) => {
    const response = await axios.get(
        `http://localhost:5000/api/admin/workers/${workerId}`
    );

    if (response.status !== 200) {
        throw new Error('No se pudo obtener la información del usuario');
    }

    return response.data.data;
};

const Workers: React.FC<IndividualWorkerParams> = async ({ params }) => {
    const individualWorkerDataFromServer =
        await getIndividualWorkerDataFromServer(params.id);

    return (
        <IndividualWorker
            individualWorkerDataFromServer={individualWorkerDataFromServer}
            userId={params.id}
        />
    );
};
export default Workers;
