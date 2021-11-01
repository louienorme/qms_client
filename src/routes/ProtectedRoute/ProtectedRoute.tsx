import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { IDecodedToken as DecodedToken } from '../../types'

const ProtectedRoute: FC<RouteProps> = ({...rest}) => {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken | null = token ? jwt_decode(token.split(' ')[1]) : null;

    return decodedToken?.type === 'Super' || 'Queue' || 'Station' ? (
        <Route {...rest} />
    )   :   (
        <Redirect to='/' />
    );
}

export default ProtectedRoute;