import { FC, useState, useEffect } from 'react'

import { TopNav } from 'components'
import FirstStation from './FirstStation'
import NthStation from './NthStation'

const Window: FC = () => {

    const [ window, setWindow ] = useState({
        number: 1,
        queue: 'Test'
    });
    
    const renderContent = (station: number) => {
        if (station === 1) {
            return <FirstStation />
        } 
        else {
            return <NthStation />
        }
    }

    useEffect(() => {
        const windowDetails = () => {
            try {

            } catch {

            } finally {

            }
        }

        windowDetails();
    }, [])

    return (
        <TopNav station={window}>
            {renderContent(window.number)}
        </TopNav>
    )
}

export default Window