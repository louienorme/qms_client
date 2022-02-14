import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    IconButton
} from '@material-ui/core'
import { Plus, Delete } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Table, Loader, DeleteDialog } from 'components';
import { IQueue, IAccount } from 'types';
import { getQueues, getAccounts, deleteQueue } from 'services';

const Queues: FC = () => {
    const history = useHistory();

    const [ queues, setQueues ] = useState<IQueue[]>([]);
    const [ admins, setAdmins ] = useState<IAccount[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const adminName = (id: string) => {
        try {
            for(let i = 0; i < admins.length; i++ ) {
                if (admins[i]._id === id) {
                    return `${admins[i].fullName.firstName} ${admins[i].fullName.lastName}`
                } 
                else {
                    return `${admins[0].fullName.firstName} ${admins[0].fullName.lastName}`
                }
            }
            
        } catch (err) {
            console.error(err)
        }
    }

    const [ selectedQueue, setSelectedQueue ] = useState<IQueue | null>(
        null
    );
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);

    const openDeleteDialog = (queue: IQueue) => {
        setSelectedQueue(queue)
        setDeleteDialogOpen(true)
    };
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const handleDeleteQueue = async () => {
        try {
            if (selectedQueue) {
                await deleteQueue(selectedQueue.name)
                
                setQueues(
                    queues.filter((queue) => queue.queueId !== selectedQueue.queueId)
                )

                closeDeleteDialog();
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong!');
        }
    }

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
            accessor: (originalRow: any) => adminName(originalRow.admin[0]),
        },
        {
            arialLabel: 'actions',
            id: 'actions',
            Cell: (({ row }: any) => (
                <>
                    <IconButton
                      size='small'
                      edge='end'
                      aria-label='delete account'
                      onClick={() => openDeleteDialog(row.original)}
                    >
                        <Delete fontSize='small' />
                    </IconButton>
                </>
            ))
        }
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

        const fetchAccounts = async () => {
             
            try {
                const { data } = await getAccounts();
                setAdmins(data.data);
                
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData();
        fetchAccounts();
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
                    <ToastContainer 
                        position='bottom-left'
                        theme='colored'
                        draggable={false}
                        closeOnClick
                        autoClose={4000}
                    />
                    <Table withSearch={true} columns={columns} data={queues} actionButtonCount={1} />
                    {selectedQueue && (
                        <>
                            <DeleteDialog
                                open={deleteDialogOpen}
                                onClose={closeDeleteDialog}
                                onDelete={handleDeleteQueue}
                                title='Delete Queue'
                                itemName={`${selectedQueue.name}`}
                            />
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Queues