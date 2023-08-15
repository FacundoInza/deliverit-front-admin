import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/admin' }),
    endpoints: (builder) => ({
        getAllWorkers: builder.query({
            query: () => '/workers/all',
        }),
        getAllDeliveries: builder.query({
            query: (date: Date) => `/deliveries/${date}`,
        }),
    }),
});

export const { useGetAllWorkersQuery, useGetAllDeliveriesQuery } = adminApi;
