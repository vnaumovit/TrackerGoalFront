import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { saveHabit } from '../../../redux/slices/habit';
import LabelStyle from '../../../components/label/LabelStyle';

export default function AddHabitDetails({ habitModal, table }) {
  const open = habitModal.open
  const setOpen = habitModal.setOpen
  const habit = habitModal.habit
  const setHabit = habitModal.setHabit
  const habitTable = table.habitTable
  const setHabitTable = table.setHabitTable

  const defaultHabit = useMemo(
    () => ({
      name: habit?.name || '',
      description: habit?.description || ''
    }), [habit]);


  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    const id = habit?.id || null
    const name = habit?.name
    const description = habit?.description
    const currentHabit = { id, name, description }
    let newHabit = await saveHabit(currentHabit);
    console.log(habit)
    if (id === null) {
      let editionHabits = [...habitTable, newHabit];
      setHabitTable(editionHabits)
    } else {
      let editionHabits = habitTable.map((t) => t.id === id ? habit : t);
      setHabitTable(editionHabits);
      setHabit(null)
    }
    handleClose()
  }


  return (
    <Dialog open={open} onClose={handleClose}>
      <form>
        <DialogTitle>Добавить новую привычку</DialogTitle>
        <DialogContent spacing={2} sx={{ mt: 1, p: 3 }}>
          <DialogContentText sx={{pr: 2}}>
            Опишите привычку, которую хотите внедрить в жизнь
          </DialogContentText>
          <LabelStyle>В кратце про привычку</LabelStyle>
          <TextField fullWidth name="name" defaultValue={defaultHabit.name}
                     onChange={(e) => setHabit({...habit, name: e.target.value})}/>
          <LabelStyle>Описание для привычки</LabelStyle>
          <TextField fullWidth name="description" defaultValue={defaultHabit.description}
                     onChange={(e) => setHabit({...habit, descriptor: e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Отмена
          </Button>
          <LoadingButton onClick={handleSave} variant="contained">
            Добавить
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};