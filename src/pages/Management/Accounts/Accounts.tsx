import { FC, useState, useEffect } from 'react'
import {
    Typography
} from '@material-ui/core'

import { Table } from '../../../components';
import { IAccount } from '../../../types';
import { getAccounts } from '../../../services';

const Accounts: FC = () => {
    const [ accounts, setAccounts] = useState<IAccount[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);

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
        accessor: (originalRow: any) => `${originalRow.name.firstName} ${originalRow.name.lastName}`,

    },
    {
        Header: 'Admin ID',
        accessor: 'adminId'
    }
]

    useEffect(() => {
        const fetchData = async () => {
            try {

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
                    <Table columns={columns} data={accounts} actionButtonCount={0} />
                </>
            ) : (
                <>
                    <Typography>
                        Loading...
                    </Typography>
                </>
            )}
        </>
    )
}

export default Accounts