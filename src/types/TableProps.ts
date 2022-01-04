import { Column } from 'react-table';
import { TableContainerProps, TableProps as MuiTableProps } from '@material-ui/core';

export interface TableProps {
     /**
   * Columns of the table.
   */
  columns: Column<{ [key: string]: any }>[];
  /**
   * Row data of the table.
   */
  data: {
    [key: string]: any;
  }[];
  /**
   * Additional component at the toolbar actions area.
   */
  // ExtraToolbarActions?: JSX.Element;
  /**
   * Show or hide the toolbar.
   * If false, `ExtraToolbarActions` will not be rendered.
   */
  // showToolbar?: boolean;
  /**
   * Specify the number of action buttons per row.
   * This is used for determining the styles of the last column.
   */
  actionButtonCount?: number;
  /**
   * Show or hide column toggling (toolbar action button)
   */
  // showColumnToggle?: boolean;
  /**
   * Props applied to the Table component
   */
  TableProps?: MuiTableProps;
  /**
   * Props applied to the TableContainer component
   */
  TableContainerProps?: TableContainerProps;
  withSearch: Boolean;
}