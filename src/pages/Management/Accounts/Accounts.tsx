import { FC, useState, useEffect } from 'react'
import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'

import { Table, Loader, } from '../../../components';
import { IAccount } from '../../../types';
import { getAccounts } from '../../../services';

const Accounts: FC = () => {
    const [ accounts, setAccounts] = useState<IAccount[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);

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
                    <Table columns={columns} data={accounts} />
                </>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Accounts