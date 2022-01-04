import { FC, Fragment } from 'react';
import clsx from 'clsx';
import {
    Button,
    Paper,
    TableContainer,
    Table as MuiTable,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Typography,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'

import { TableProps } from '../../types'
import  GlobalFilter from '../GlobalFilter'

const Table: FC<TableProps> = ({
    columns,
    data,
    // showToolbar = true,
    // ExtraToolbarActions,
    actionButtonCount = 0,
    // showColumnToggle = false,
    TableProps,
    TableContainerProps,
    // ...rest,
    withSearch
}) => {
    const hasActionButtons = actionButtonCount > 0;

    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        tableContainer: {
            '& tr:last-of-type td': {
            borderBottom: 'none',
            },
            '& th': {
            backgroundColor: theme.palette.background.paper,
            },
        },
        table: {
            '& th:last-child': {
            minWidth: hasActionButtons
                ? theme.spacing(actionButtonCount === 1 ? 8 : actionButtonCount * 6)
                : 'initial',
            width: hasActionButtons
                ? theme.spacing(actionButtonCount === 1 ? 8 : actionButtonCount * 6)
                : 'initial',
            },
            '& td:last-child': {
            textAlign: hasActionButtons ? 'right' : 'inherit',
            '& > * + *': {
                marginLeft: hasActionButtons ? theme.spacing(1) : 0,
            },
          },
        },
        toolbar: {
            display: 'flex',
            margin: '1rem'
        }
      })
    );

    const classes = useStyles();

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        // @ts-ignore
        pageOptions,
        // @ts-ignore
        page,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    
    
    // @ts-ignore
    const { globalFilter, pageIndex } = state

    return (
        <>
            {withSearch ? <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> : ''}
            <TableContainer
                component={Paper}
                {...TableContainerProps}
                className={clsx(classes.tableContainer, {
                [TableContainerProps?.className || '']: TableContainerProps,
                })}
            >
                <MuiTable
                {...getTableProps()}
                stickyHeader
                {...TableProps}
                className={clsx(classes.table, {
                    [TableProps?.className || '']: TableContainerProps,
                })}
                >
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) =>
                            // @ts-ignore
                            !column?.hideColumn ? (
                                <TableCell
                                {...(column.id === 'selection'
                                    ? column.getHeaderProps([
                                        {
                                        // @ts-ignore
                                        className: column?.className || '',
                                        // @ts-ignore
                                        style: column?.style || {},
                                        // @ts-ignore
                                        'aria-label': column?.ariaLabel,
                                        },
                                    ])
                                    : column.getHeaderProps([
                                        {
                                        // @ts-ignore
                                        className: column?.className || '',
                                        // @ts-ignore
                                        style: column?.style || {},
                                        // @ts-ignore
                                        'aria-label': column?.ariaLabel,
                                        },
                                        // @ts-ignore
                                        column.getSortByToggleProps(),
                                    ]))}
                                >
                                {column.render('Header')}
                                {column.id !== 'selection' ? (
                                    <TableSortLabel
                                    // @ts-ignore
                                    active={column.isSorted}
                                    // @ts-ignore
                                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                                    />
                                ) : null}
                                </TableCell>
                            ) : (
                                <Fragment key={column.getHeaderProps().key} />
                            )
                            )}
                        </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {// @ts-ignore
                        page.map((row) => {
                        prepareRow(row);
                        return (
                            <TableRow hover {...row.getRowProps()}>
                            {// @ts-ignore
                            row.cells.map((cell) =>
                                // @ts-ignore
                                !cell.column?.hideColumn ? (
                                <TableCell
                                    {...cell.getCellProps([
                                    {
                                        // @ts-ignore
                                        className: cell?.column?.cellClassName || '',
                                        // @ts-ignore
                                        style: cell?.column?.cellStyle || {},
                                    },
                                    ])}
                                >
                                    {cell.render('Cell')}
                                </TableCell>
                                ) : (
                                <Fragment key={cell.getCellProps().key} />
                                )
                            )}
                            </TableRow>
                        );
                        })}
                    </TableBody>          
                </MuiTable>
            </TableContainer>
            <div className={classes.toolbar}>
                <Typography variant='overline'>
                    Total No. of Entries: {rows.length}
                </Typography>
                <div style={{ flexGrow: 1, }}></div>
                <div style={{ alignItems: 'right' }}>
                    <Button onClick={() => previousPage()}>Previous</Button>
                    <Typography variant='overline'>
                        Page {pageIndex + 1} of {pageOptions.length} 
                    </Typography>
                    <Button onClick={() => nextPage()}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default Table