export interface IDealer {
    id: string;
    name: string;
    lastName: string;
    workState: 'inactive' | 'pending' | 'delivered';
    urlImage: string;
    totalPackages: number;
    deliveredPackages: number;
}
