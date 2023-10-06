import { IDeliveredOrders } from './IDeliveredOrders';
import { IPendingOrders } from './IPendingOrders';

export interface IDeliveriesPerWorker {
    workerId: string;
    status: string;
    urlImage: string;
    deliveredOrders: Array<IDeliveredOrders>;
    pendingOrders: Array<IPendingOrders>;
}
