import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Button,
  Card,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  RHFCheckbox,
  RHFEditor, RHFMultiCheckbox,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile
} from '../../../../components/hook-form';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';
// form
// eslint-disable-next-line import/no-unresolved
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

HabitNewEditDetails.propTypes = {
  isEdit: PropTypes.bool,
  currentGoal: PropTypes.object
};

export default function HabitNewEditDetails({open, handleClose}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          type="email"
          margin="dense"
          variant="outlined"
          label="Email Address"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
