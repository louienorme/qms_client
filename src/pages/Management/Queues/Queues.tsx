import { FC, useState, useEffect } from 'react'
import {
    Typography
} from '@material-ui/core'

import { Table } from '../../../components';
import { IQueue } from '../../../types';
import { getQueues } from '../../../services';

const Queues: FC = () => {
    const [ queues, setQueues ] = useState<IQueue[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accesor: (row: any, index: number) => index + 1,
            cellStyle : {
                width: 100
            }
        },
        {
            Header: 'Queue ID',
            accesor: 'queueId',
        },
        {
            Header: 'Name',
            id: 'name',
            accesor: 'name'
        },
        {
            Header: 'Status',
            accesor: 'status'
        },
        {
            Header: 'Administrator',
            accesor: (originalRow: any) => `${originalRow}`
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getQueues();
                setQueues(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData();
    }, []);

    return (
        <>
            {!isLoading ? (
                <>
                    <Table columns={columns} data={queues} />
                </>
            ) : (
                <div>
                    <Typography>
                        Loading...
                    </Typography>
                </div>
            )}
        </>
    )
}

export default Queues