export default interface IUser {
    id?: string;
    _id?: string;
    username: string;
    password?: string;
    displayName?: string;
    block?: boolean;
    confirmed?: boolean;
    deleted?: boolean;
    account?: any;
    role?: string;
    accesses?: number[];
    services?: number[];
}