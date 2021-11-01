export interface IDecodedToken {
    __id: string;
    type: string;
    username: string;
    permissions: string[];
    iat: number;
    exp: number;
}