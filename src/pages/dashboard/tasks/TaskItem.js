import { useState } from 'react';
import { deleteTask, updateStatusTask } from '../../../redux/slices/task';
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import TaskMenu from './TaskMenu';

export default function TaskItem({ task, table, taskModal }) {
  const [checked, setChecked] = useState(task.isDone);
  const {taskTable, setTaskTable} = table
  const {setTask, setOpen} = taskModal

  async function handleSelected(task, isDone) {
    setChecked(isDone)
    task = { ...task, isDone }
    await updateStatusTask(task);
  }

  const handleDelete = async (id) => {
    await deleteTask(id);
    let deleteTasks = taskTable.filter(t => t.id !== id);
    setTaskTable(deleteTasks);
  }

  const handleEdit = async (task) => {
    setTask(task)
    setOpen(true)
  };

  const onSelected = () => handleSelected(task, !checked);
  const onDeleteRow = () => handleDelete(task.id);
  const onEditRow = () => handleEdit(task);
  const onMethods = { onEditRow, onDeleteRow, onSelected }

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through'
        })
      }}
    >
      <FormControlLabel
        onChange={() => handleSelected(task, !checked)}
        control={<Checkbox checked={checked}/>}
        label={<Typography
          sx={{ fontSize: 18, fontWeight: 600 }}>{task.name}</Typography>}
        sx={{ flexGrow: 1, m: 0 }}
      />
      <TaskMenu onMethods={onMethods}/>
    </Stack>
  );
};