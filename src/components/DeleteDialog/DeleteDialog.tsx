import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

interface Props {
  title?: string;
  content?: JSX.Element | string;
  itemName?: JSX.Element | string;
  itemGroupName?: JSX.Element | string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog: FC<Props> = ({
  title = 'Delete Item',
  content,
  itemName,
  itemGroupName,
  open,
  onDelete,
  onClose,
}) => {
  itemName = itemName ? (
    <>
      <Typography
        component='span'
        color='primary'
        style={{ fontWeight: 'bold' }}
      >
        {itemName}
      </Typography>
      {itemGroupName && (
        <>
          &nbsp;from&nbsp;
          <Typography
            component='span'
            color='primary'
            style={{ fontWeight: 'bold' }}
          >
            {itemGroupName}
          </Typography>
        </>
      )}
    </>
  ) : (
    'this item'
  );

  const defaultContent = (
    <>
      Are you sure you want to delete {itemName}? All associated data with this
      will be lost.
    </>
  );

  if (!content) {
    content = defaultContent;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle disableTypography id='delete-dialog-title'>
          <Typography variant='h3' component='h2'>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent id='delete-dialog-description'>
          <Typography gutterBottom>{content}</Typography>
          <Typography color='error'>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={onDelete}
            color='primary'
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
