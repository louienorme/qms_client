import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

interface DecodedToken {
    __id: string;
    type: string;
    username: string;
    permissions: string[];
}

const ProtectedRoute: FC<RouteProps> = props => {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken | null = token ? jwt_decode(token) : null;

    return decodedToken?.type === 'Super' || 'Queue' || 'Station' || 'Window' ? (
        <Route {...props} />
    )   :   (
        <Redirect to='/' />
    );
}

export default ProtectedRoute;