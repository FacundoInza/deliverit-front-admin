import React, { FC } from 'react';
import 'swiper/css';
import { Homepage } from '../../components/ui/homepage/Homepage';
import { dateFormatting } from '../../utils';
import { axiosInstance } from '../../interceptors';

const getDailyMetricsFromServer = async () => {
    const dateMerge = dateFormatting();

    const response = await axiosInstance.get(`/api/admin/${dateMerge}`);

    if (response.status !== 200) {
        throw new Error('Daily metrics not found');
    }

    return response.data.data;
};

const Admin: FC = async () => {
    const dailyMetricsFromServer = await getDailyMetricsFromServer();

    return <Homepage dailyMetricsFromServer={dailyMetricsFromServer} />;
};
export default Admin;
