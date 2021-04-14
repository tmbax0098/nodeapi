

export default interface IUser {
    id?: string;
    _id?: string;
    username: string;
    password?: string;
    displayName?: string;
    active?: boolean;
    block?: boolean;
    confirmed?: boolean;
    person?: any;
}