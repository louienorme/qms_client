import { FC, useState, useEffect } from 'react'
import {
    IconButton,
    Button,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    Delete,
    Plus
} from 'mdi-material-ui'

import { Table, Loader, } from '../../../components';
import { CreateAccountModal } from './modals';
import { IAccount } from '../../../types';
import { getAccounts } from '../../../services';

const Accounts: FC = () => {
    // Notifiers

    // Data
    const [ accounts, setAccounts] = useState<IAccount[]>([]);
    const [ selectedAccount, setSelectedAccount ] = useState<IAccount | null>(
        null
    );

    // Page Status
    const [ isLoading, setIsLoading ] = useState(true);

    // Modals
    const [ createModalOpen, setCreateModalOpen ] = useState(false);

    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const handleCreateAccount = ( newAccount: IAccount ) => {
        let newQuery= [
            ...accounts,
            newAccount
        ]

        setAccounts(newQuery);

        closeCreateModal();
    }
 

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accessor: (row: any, index: number) => index + 1,
            cellStyle: {
                width: 100
            },
        },
        {
            Header: 'Name',
            id: 'name',
            accessor: (originalRow: any) => `${originalRow.fullName.firstName} ${originalRow.fullName.lastName}`,

        },
        {
            Header: 'Admin ID',
            accessor: 'adminId'
        },
        {
            Header: 'Status',
            accessor: (originalRow: any) => originalRow.status ? 'Active' : 'Inactive',
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
                const { data } = await getAccounts();
                setAccounts(data.data);
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
                      startIcon={<Plus />}
                      onClick={openCreateModal}
                      style={{ marginBottom: '1rem' }}
                    >
                        Create
                    </Button>
                    <Table columns={columns} data={accounts} actionButtonCount={1} />
                    <CreateAccountModal 
                      open={createModalOpen}
                      onClose={closeCreateModal}
                      onCreate={handleCreateAccount}
                    />
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Accounts