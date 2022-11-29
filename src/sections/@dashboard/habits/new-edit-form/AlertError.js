import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

export default function AlertError({ open, setOpen }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>Ошибка</AlertTitle>
          Не получилось добавить цель.
          <br/>
          Попробуйте еще раз!
        </Alert>
      </Snackbar>
    </div>
  );
}