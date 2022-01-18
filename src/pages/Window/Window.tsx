import { FC, useState, useEffect } from 'react'

import { TopNav } from 'components'
import jwt_decode from 'jwt-decode'

import FirstStation from './FirstStation'
import NthStation from './NthStation'
import { getOneAccount } from 'services'
import { IDecodedToken as DecodedToken } from 'types'

const Window: FC = () => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ window, setWindow ] = useState({ 
        number: 0,
        queue: 'test',
        station: 0
    });
    
    const renderContent = (station: number) => {
        if (station === 1) {
            return <FirstStation />
        } 
        else {
            return <NthStation />
        }
    }
    
    const token: any = localStorage.getItem('token')
    const payload: DecodedToken = jwt_decode(token.split(' ')[1]);

    useEffect(() => {
        const windowDetails = async () => {
            try {
                const { data } = await getOneAccount(payload._id);    
                const details = data.data[0];
                setWindow({ number: details.window, queue: details.queueName, station: details.station })

            } catch (err) {
                console.error(err);
            } finally {

            }
        }

        windowDetails();
    }, [])

    return (
        <TopNav station={window}>
            {renderContent(window.station)}
        </TopNav>
    )
}

export default Window