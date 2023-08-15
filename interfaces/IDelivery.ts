export interface IDelivery {
    id: string;
    initialDate: string;
    startingLocation: Array<string>;
    address: string;
    status: string;
    orderId: string;
    workerId: string;
    resolutionDate: string;
}
