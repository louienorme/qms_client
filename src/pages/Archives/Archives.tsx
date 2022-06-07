import { FC, useState, useEffect } from 'react'

import {
    Typography,
} from '@material-ui/core'

import { AdminWrapper, Table, Loader, EmptyPage } from '../../components' 
import { getArchives } from 'services'
import { IArchive } from 'types'

const Archives: FC = () => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ archives, setArchives ] = useState<IArchive[]>([])

    const datetimeFormatter = (datetime: any) => {
        let date = new Date(datetime).toLocaleString();

        return (`${date}`);
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
            Header: 'Ticket',
            accessor: 'ticket'
        },
        {
            Header: 'Name',
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
            Header: 'Datetime Started',
            accessor: (originalRow: any) => datetimeFormatter(originalRow.timeStarted),
        },
        {
            Header: 'Datetime Ended',
            accessor: (originalRow: any) => datetimeFormatter(originalRow.timeEnded),
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
                !isLoading ? (
                        archives ? (
                            <Table withSearch={true} columns={columns} data={archives} />
                        ) : (
                            <EmptyPage message='Oops! Where is everybody?' />
                        )
                ) : (
                    <Loader />
                )
                   
            }
        </AdminWrapper>
    )
}



export default Archives