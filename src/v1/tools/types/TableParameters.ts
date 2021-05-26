type TableParameters = {
    size: number;
    page: number;
    count: number;
    list: Array<any>;
    filters?: UserTableParameters

}


type UserTableParameters = {
    searchText: string;
    searchMode: number | string;
    blocked: boolean;
    deleted: boolean;
    confirmed: boolean;
    role: number;
    services: number;
}

export default TableParameters;
