import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Button,
    IconButton
} from '@material-ui/core'
import { Plus, Delete } from 'mdi-material-ui'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwt_decode from 'jwt-decode'

import { Table, Loader, DeleteDialog, EmptyPage } from 'components';
import { IQueue, IAccount, IDecodedToken } from 'types';
import { getQueues, getAccounts, deleteQueue, getOneAccount } from 'services';

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

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);

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
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            try {
                const { data } = await getQueues();

                details.type === 'Queue' 
                    ?  setQueues(data.data.filter((element: any) => element.admin[0] === details._id ? element : '' ))
                    :  setQueues(data.data)
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
                    {
                        queues.length === 0 ? (
                            <EmptyPage message='It is quite peaceful here actually!' />
                        ) : (
                            <Table withSearch={true} columns={columns} data={queues} actionButtonCount={1} />
                        )
                    }
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