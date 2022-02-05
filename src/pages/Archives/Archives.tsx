import { FC, useState, useEffect } from 'react'

import {
    Typography
} from '@material-ui/core'

import { AdminWrapper, Table, Loader } from '../../components' 
import { getArchives } from 'services'
import { IArchive } from 'types'

const Archives: FC = () => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ archives, setArchives ] = useState<IArchive[]>([])

    const dateFormatter = (datetime: any) => {
        let date = new Date(datetime);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()

        return (`${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`);
    }

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accessor: (row: any, index: number) => index + 1,
            cellStyle: {
                width: 25
            },
        },
        {
            Header: 'Pool ID',
            accessor: 'poolId'
        },
        {
            Header: 'Ticket Number',
            accessor: 'ticket'
        },
        {
            Header: 'User',
            accessor: 'user'
        },
        {
            Header: 'Queue',
            id: 'queue',
            accessor: 'queue'
        },
        {
            Header: 'Station',
            accessor: 'station'
        },
        {
            Header: 'Window',
            accessor: 'window'
        },
        {
            Header: 'Action',
            accessor: 'action'
        },
        {
            Header: 'Time Started',
            accessor: (originalRow: any) => dateFormatter(originalRow.timeStarted),
        },
        {
            Header: 'Time Ended',
            accessor: (originalRow: any) => dateFormatter(originalRow.timeEnded),
        }   
    ]

    useEffect(() => {
        const archivesData = async () => {
            try {

                const { data } = await getArchives();
                setArchives(data.data)
                console.log(data)

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }   

        archivesData();
    }, [])

    return (
        <AdminWrapper>
            <Typography variant='h4' gutterBottom>
                Archives
            </Typography>
            {
                isLoading 
                    ? <Loader />
                    : <Table withSearch={true} columns={columns} data={archives} />
            }
        </AdminWrapper>
    )
}

export default Archives