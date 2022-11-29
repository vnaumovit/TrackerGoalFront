import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from '../../../redux/store';
import { deleteGoal, getGoals } from '../../../redux/slices/goal';
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
import GoalAnalytic from '../../../sections/@dashboard/goals/GoalAnalytic';
import Label from '../../../components/Label';
import GoalTableToolbar
  from '../../../sections/@dashboard/goals/GoalTableToolbar';
import { parseDate } from '../../../utils/formatTime';

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

  const { goals, isLoading } = useSelector((state) => state.goal);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('Создана');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [tableData, setTableData] = useState([]);

  const {
    currentTab: filterStatus,
    onChangeTab: onFilterStatus
  } = useTabs( 'Начата');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteGoal(id)
  }

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
    deleteGoal(selected)
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.goals.edit(paramCase(id)));
  };

  const handleViewRow = (id) => {
    push(PATH_DASHBOARD.goals.view(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);
  const getLengthByStatus = (status) => tableData.filter((goal) => goal.status === status).length;
  const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

  const TABS = [
    {
      value: 'Создана',
      label: 'Созданные',
      color: 'info',
      count: getLengthByStatus('Создана')
    },
    {
      value: 'Начата',
      label: 'Начатые',
      color: 'warning',
      count: getLengthByStatus('Начата')
    },
    {
      value: 'Успех',
      label: 'Успешные',
      color: 'success',
      count: getLengthByStatus('Успех')
    },
    {
      value: 'Провал',
      label: 'Проваленные',
      color: 'error',
      count: getLengthByStatus('Провал')
    },
    {
      value: 'Приостановлена',
      label: 'Приостоновленные',
      color: 'default',
      count: getLengthByStatus('Приостановлена')
    }
  ];

  useEffect(() => {
    dispatch(getGoals(page, rowsPerPage));
  }, [dispatch]);

  useEffect(() => {
    if (goals.length) {
      setTableData(goals);
    }
  }, [goals]);


  return (
    <Page title="Цели">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Список целей"
          links={[
            { name: 'Панель', href: PATH_DASHBOARD.root },
            {
              name: 'Цели',
              href: PATH_DASHBOARD.goals.root
            },
            { name: 'Список' }
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.goals.new} passHref>
              <Button variant="contained"
                      startIcon={<Iconify icon="eva:plus-fill"/>}>
                Новая цель
              </Button>
            </NextLink>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem
                                sx={{ borderStyle: 'dashed' }}/>}
              sx={{ py: 2 }}
            >
              <GoalAnalytic
                title="Созданные"
                total={getLengthByStatus('Создана')}
                percent={getPercentByStatus('Создана')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <GoalAnalytic
                title="Начатые"
                total={getLengthByStatus('Начата')}
                percent={getPercentByStatus('Начата')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <GoalAnalytic
                title="Успешные"
                total={getLengthByStatus('Успех')}
                percent={getPercentByStatus('Успех')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <GoalAnalytic
                title="Проваленные"
                total={getLengthByStatus('Провал')}
                percent={getPercentByStatus('Провал')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
              <GoalAnalytic
                title="Пауза"
                total={getLengthByStatus('Приостановлена')}
                percent={getPercentByStatus('Приостановлена')}
                icon="eva:file-fill"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    <div>{tab.label}</div>
                    <Label color={tab.color}> {tab.count} </Label>
                  </Stack>
                }
              />
            ))}
          </Tabs>
          <Divider/>

          <GoalTableToolbar
            filterName={filterName}
            filterService={filterService}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

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
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <GoalTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index}
                                                      sx={{ height: denseHeight }}/>
                      )
                    )}

                  <TableEmptyRows height={denseHeight}
                                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}/>

                  <TableNoData isNotFound={isNotFound}/>
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
                           comparator,
                           filterName,
                           filterStatus,
                           filterService,
                           filterStartDate,
                           filterEndDate
                         }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (goal) =>
        goal.description.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        goal.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  tableData = tableData.filter((goal) => goal.status === filterStatus);

  if (filterStartDate && filterEndDate) {
    let startDate = parseDate(filterStartDate)
    let endDate = parseDate(filterEndDate)

    tableData = tableData.filter(
      (goal) =>
        goal.startDate >= startDate && goal.endDate <= endDate
    );
  }

  return tableData;
}
