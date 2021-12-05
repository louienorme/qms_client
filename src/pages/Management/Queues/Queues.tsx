import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button
} from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

import { Table, Loader, } from '../../../components';
import { IQueue } from '../../../types';
import { getQueues } from '../../../services';

const Queues: FC = () => {
    const history = useHistory();

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
                    <Button
                      color='primary'
                      variant='contained'
                      startIcon={<Plus/>}
                      onClick={() => history.push('/management/queue-creation')}
                      style={{ marginBottom: '1rem' }}
                    >
                        Create
                    </Button>
                    <Table columns={columns} data={queues} />
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Queues