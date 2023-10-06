export interface IUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    enabled: boolean;
    blockUntil: Date | null;
    lastSeenAt: Date;
    urlImage: string;
}
