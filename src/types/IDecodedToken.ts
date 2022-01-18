export interface IDecodedToken {
    _id: string;
    type: string;
    username: string;
    permissions: string[];
    iat: number;
    exp: number;
}