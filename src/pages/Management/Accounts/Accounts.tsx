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
    Plus,
    AccountEdit
} from 'mdi-material-ui'

import { Table, Loader, DeleteDialog } from 'components';
import { CreateAccountModal, EditModal } from './modals';
import { IAccount } from 'types';
import { getAccounts, deleteAccount } from 'services';

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
    const [ editModalOpen, setEditModalOpen ] = useState(false);
    const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);

    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const openEditModal = (account: IAccount) => {
        setSelectedAccount(account)
        setEditModalOpen(true)
    };
    const closeEditModal = () => setEditModalOpen(false);

    const openDeleteDialog = (account: IAccount) => {
        setSelectedAccount(account)
        setDeleteDialogOpen(true)
    };
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const handleCreateAccount = ( newAccount: IAccount ) => {
        let newQuery= [
            ...accounts,
            newAccount
        ]

        setAccounts(newQuery);

        closeCreateModal();
    }

    const handleEditAccount = ( editAccount: IAccount ) => {
        const newQuery = accounts
            .map((account) => 
            account._id === editAccount._id ? editAccount : account)

        setAccounts(newQuery);
        closeEditModal();
    }
 
    const handleDeleteAccount = async () => {
        try {
            if (selectedAccount) {
                await deleteAccount(selectedAccount._id)

                setAccounts(
                    accounts.filter((account) => account._id !== selectedAccount._id)
                )

                closeDeleteDialog();
            }
        } catch (err) {
            console.error(err)
        }
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
                      aria-label='account edit'
                      onClick={() => openEditModal(row.original)}
                    >
                        <AccountEdit fontSize='small' />
                    </IconButton>
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
                    <Table withSearch={true} columns={columns} data={accounts} actionButtonCount={2} />
                    <CreateAccountModal 
                      open={createModalOpen}
                      onClose={closeCreateModal}
                      onCreate={handleCreateAccount}
                    />
                    {selectedAccount && (
                        <>
                            <EditModal
                                open={editModalOpen}
                                onClose={closeEditModal}
                                onEdit={handleEditAccount}
                                account={selectedAccount}
                            />
                            <DeleteDialog
                                open={deleteDialogOpen}
                                onClose={closeDeleteDialog}
                                onDelete={handleDeleteAccount}
                                title='Delete Account'
                                itemName={`${selectedAccount.fullName.firstName} ${selectedAccount.fullName.lastName}`}
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

export default Accounts