export interface IWorker {
    id: string;
    name: string;
    workerStatus: 'inactive' | 'active';
    picture: string;
    createdAt: string;
}
