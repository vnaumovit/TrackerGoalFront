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
import { saveTask } from '../../../redux/slices/task';

export default function AddTaskDetails({ taskModal, table }) {
  const open = taskModal.open
  const setOpen = taskModal.setOpen
  const currentTask = taskModal.task
  const setTask = taskModal.setTask
  const taskTable = table.taskTable
  const setTaskTable = table.setTaskTable

  const [name, setName] = useState( currentTask?.name);
  const defaultName = useMemo(() => (currentTask?.name), [currentTask]);


  const handleClose = () => {
    setOpen(false);
    setName('')
  };

  const handleSave = async (e) => {
    e.preventDefault()
    const id = currentTask?.id
    const isDone = currentTask?.isDone || false
    const task = { id, name, isDone }
    await saveTask(task);
    if (currentTask === null) {
      let editionTasks = [...taskTable, task];
      setTaskTable(editionTasks)
    } else {
      let editionTasks = taskTable.map((t) => t.id === id ? task : t);
      setTaskTable(editionTasks);
      setTask(null)
    }
    handleClose()
  }


  return (
    <Dialog open={open} onClose={handleClose}>
      <form>
        <DialogTitle>Добавить новую задачу</DialogTitle>
        <DialogContent spacing={2} sx={{ mt: 1, p: 3 }}>
          <DialogContentText>
            Опишите задачу, которую необходимо выполнить
          </DialogContentText>
          <TextField fullWidth name="name" defaultValue={defaultName}
                     onChange={(e) => setName(e.target.value)}/>
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