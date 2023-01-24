import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({ open, setOpen, title, actionFunc, children }) {

    const handleClose = () => {
        setOpen(false);
    };
    const submit = ()=>{
        actionFunc()
        handleClose()
    }
        return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submit}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}
