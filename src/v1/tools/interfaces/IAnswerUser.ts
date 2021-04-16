export default interface IAnswerUser {
    id?: string;
    username: string;
    displayName?: string;
    account?: any;
    role?: string;
    accesses?: number[],
    services?: number[]
}