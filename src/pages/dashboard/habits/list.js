import React, { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton
} from '../../../components/table';
// sections
import { useTheme } from '@mui/material/styles';
import HabitTableRow
  from '../../../sections/@dashboard/habits/product-list/HabitTableRow';
import { useLocale } from '../../../components/locales/use-locale';
import {
  deleteHabit,
  getHabits,
  updateHabitDays
} from '../../../redux/slices/habit';
import AddHabitDetails from './addHabitDetails';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Привычка', align: 'left' }
];

// ----------------------------------------------------------------------

GoalList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------


export default function GoalList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage
  } = useTable({
    defaultOrderBy: 'createdAt'
  });

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const [habit, setHabit] = useState(null)
  const [open, setOpen] = useState(false);
  const { habits, isLoading } = useSelector((state) => state.habit);
  const [habitTable, setHabitTable] = useState([]);
  const table = { habitTable, setHabitTable }
  const [updateDays, setUpdateDays] = useState([])
  const updateDaysData = { updateDays, setUpdateDays }
  const habitModal = { open, setOpen, habit, setHabit }

  useEffect(() => {
    dispatch(getHabits(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);


  useEffect(() => {
    if (habits.length) {
      setHabitTable(habits);
    }
  }, [habits]);

  const weekdays = useLocale()


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateHabits = () => {
    if (updateDays.length) {
      updateHabitDays(updateDays);
      setUpdateDays([])
    }
  }

  const handleDeleteRow = (id) => {
    const deleteRow = habitTable.filter((row) => row.id !== id);
    setSelected([]);
    setHabitTable(deleteRow);
    deleteHabit(id)
  }

  const handleDeleteRows = (selected) => {
    const deleteRows = habitTable.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setHabitTable(deleteRows);
    deleteHabit(selected)
  };

  const handleEditRow = (id) => {
    // push(PATH_DASHBOARD.goals.edit(paramCase(id)));
  };

  const handleViewRow = (id) => {
    // push(PATH_DASHBOARD.goals.view(id));
  };

  const dataFiltered = applySortFilter({
    habitTable,
    comparator: getComparator(order, orderBy)
  });

  const denseHeight = dense ? 56 : 76;

  return (
    <Page title="Цели">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Список привычек"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Привычки'
            }
          ]}
          action={
            <Stack direction="row" justifyContent="flex-end" spacing={3}>
              <Button startIcon={<Iconify icon="eva:plus-fill"/>}
                      variant="contained" onClick={handleClickOpen}>Добавить
                привычку
              </Button>
              <Button startIcon={<Iconify icon={'material-symbols:update'}/>}
                      variant="contained" onClick={handleUpdateHabits}>
                Обновить изменения
              </Button>
            </Stack>
          }
        />

        <Card>

          <AddHabitDetails table={table} habitModal={habitModal}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={habitTable.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      habitTable.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Удалить">
                      <IconButton color="primary"
                                  onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'}/>
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={[...TABLE_HEAD, ...weekdays.map((d, index) => ({
                    id: index,
                    label: d.format('DD/MM')
                  })), { id: '' }]}
                  rowCount={habitTable.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      habitTable.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <HabitTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          updateDaysData={updateDaysData}
                        />
                      ) : (
                        !habitTable.length && <TableSkeleton key={index}
                                                             sx={{ height: denseHeight }}/>
                      )
                    )}

                  <TableEmptyRows height={denseHeight}
                                  emptyRows={emptyRows(page, rowsPerPage, habitTable.length)}/>

                  <TableNoData isNotFound={!habitTable.length}/>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense}/>}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------


function applySortFilter({
                           habitTable,
                           comparator
                         }) {
  const stabilizedThis = habitTable.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  habitTable = stabilizedThis.map((el) => el[0]);

  return habitTable;
}
