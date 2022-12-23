// @mui
import { Box } from '@mui/material';
// components
import { TableNoData } from '../../../components/table';
import TaskItem from './TaskItem';
// ----------------------------------------------------------------------

export default function TasksTable({ taskModal, table }) {
  const taskTable = table.taskTable

  return (
    <Box>
      {taskTable.length ?
        <div>
          {taskTable.map((task) => (
            <TaskItem key={task.id} task={task} taskModal={taskModal} table={table}/>))}
        </div>
        : <TableNoData isNotFound={true}/>
      }
    </Box>
  );
}

// ----------------------------------------------------------------------