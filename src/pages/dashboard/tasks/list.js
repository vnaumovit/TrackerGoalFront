// next
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
// routes
// hooks
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import AddTaskDetails from './addTaskDetails';
import React, { useEffect, useState } from 'react';
import TasksTable from './TasksTable';
import useTable from '../../../hooks/useTable';
import Iconify from '../../../components/Iconify';
import { TableSkeleton } from '../../../components/table';
import { useDispatch, useSelector } from '../../../redux/store';
import { getTasks } from '../../../redux/slices/task';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

TaskList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------


export default function TaskList() {

  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.task);
  const [taskTable, setTaskTable] = useState([]);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(null)

  const {
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage
  } = useTable({
    defaultOrderBy: 'createdAt'
  });

  const table = { taskTable, setTaskTable }
  const taskModal = { open, setOpen, task, setTask }

  useEffect(() => {
    dispatch(getTasks(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (tasks.length) {
      setTaskTable(tasks);
    }
  }, [tasks]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Page title="Список задач">

      <Container>
        <HeaderBreadcrumbs
          heading="Список задач"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Задачи'
            }
          ]}
          action={
            <Button startIcon={<Iconify icon="eva:plus-fill"/>}
                    variant="contained"
                    onClick={handleClickOpen}>
              Добавить задачу
            </Button>
          }
        />
        <Card>
          <Scrollbar>
            <TableContainer>
              <Grid>
                <AddTaskDetails table={table} taskModal={taskModal}/>
                {
                  !isLoading ?
                    <TasksTable table={table} taskModal={taskModal}/>
                    : <TableSkeleton/>
                }
                <Box sx={{ position: 'relative' }}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                    component="div"
                    count={taskTable.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                  />
                </Box>
              </Grid>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
};

// ----------------------------------------------------------------------