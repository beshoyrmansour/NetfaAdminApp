import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TCategory } from '../models/Categories';


interface Props {
    title: string;
    message: string;
    sumbit: string;
    onCancel: () => void;
    onSubmit: () => void;
    open: boolean;
}

const ConfirmDialog = (props: Props) => {
    const {
        title,
        message,
        sumbit,
        onCancel,
        onSubmit,
        open
    } = props;
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    تراجع
          </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                    {sumbit}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
