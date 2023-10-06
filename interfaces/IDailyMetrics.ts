export interface IDailyMetrics {
    deliveredOrders: number;
    availableOrders: number;
    availableWorkers: number;
    activeWorkers: { total: number; images: Array<IWorkerImages> };
}

interface IWorkerImages {
    id: string;
    urlImage: string;
}
