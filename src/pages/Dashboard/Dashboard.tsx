import { FC } from 'react'

import {
    Typography
} from '@material-ui/core'

import { AdminWrapper } from '../../components' 

const Dashboard: FC = () => {

    return (
        <AdminWrapper> 
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
        </AdminWrapper>
    )
}

export default Dashboard