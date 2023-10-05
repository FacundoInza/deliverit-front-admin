import React from 'react';
import 'swiper/css';
import { IndividualWorker } from '../../../../components/ui/individualWorker/IndividualWorker';
import { axiosInstance } from '../../../../interceptors';

interface IndividualWorkerParams {
    params: {
        id: string;
    };
}

const getIndividualWorkerDataFromServer = async (workerId: string) => {
    const response = await axiosInstance.get(`/api/admin/workers/${workerId}`);

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
