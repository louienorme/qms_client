import { FC, useState, useEffect } from 'react'
import {
    Typography
} from '@material-ui/core'

import { Table, Loader, } from '../../../components';
import { IQueue } from '../../../types';
import { getQueues } from '../../../services';

const Queues: FC = () => {
    const [ queues, setQueues ] = useState<IQueue[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accessor: (row: any, index: number) => index + 1,
            cellStyle : {
                width: 100
            }
        },
        {
            Header: 'Name',
            id: 'name',
            accessor: 'name'
        },
        {
            Header: 'Queue ID',
            accessor: 'queueId',
        },
        {
            Header: 'Status',
            accessor: (originalRow: any) => originalRow.status ? 'Active' : 'Inactive',
        },
        {
            Header: 'Administrator',
            accessor: (originalRow: any) => `${originalRow.admin}`,
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
                <Loader />
            )}
        </>
    )
}

export default Queues