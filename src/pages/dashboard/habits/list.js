import { useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
  Tooltip
} from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
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
import {
  GoalTableRow
} from '../../../sections/@dashboard/goals/product-list';
import useTabs from '../../../hooks/useTabs';
import { useTheme } from '@mui/material/styles';
import Label from '../../../components/Label';
import GoalTableToolbar
  from '../../../sections/@dashboard/goals/GoalTableToolbar';
import { parseDate } from '../../../utils/formatTime';
import HabitNewEditDetails
  from '../../../sections/@dashboard/habits/new-edit-form/HabitNewEditDetails';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Заглавие', align: 'left' },
  { id: 'finishTitle', label: 'Причина для завершения цели', align: 'left' },
  { id: 'status', label: 'Статус', align: 'center' },
  { id: 'goalGroup', label: 'Группа', align: 'center' },
  { id: 'endDate', label: 'Дата завершения', align: 'center', width: 140 },
  { id: '' }
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

  const [tableData, setTableData] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  }

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    // push(PATH_DASHBOARD.goals.edit(paramCase(id)));
  };

  const handleViewRow = (id) => {
    // push(PATH_DASHBOARD.goals.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy)
  });

  const denseHeight = dense ? 56 : 76;

  return (
    <Page title="Цели">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Список целей"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Цели',
              href: PATH_DASHBOARD.habits.root
            },
            { name: 'Список' }
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.habits.new} passHref>
              <Button startIcon={<Iconify icon="eva:plus-fill"/>} variant="outlined" onClick={handleClickOpen}>
                Новая привычка
              </Button>
            </NextLink>
          }
        />

        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
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
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {/*<HabitNewEditDetails open={open} handleClose={handleClose}/>*/}
                  <TableEmptyRows height={denseHeight}
                                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}/>

                  <TableNoData isNotFound={true}/>
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
                           tableData,
                           comparator
                         }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  return tableData;
}
