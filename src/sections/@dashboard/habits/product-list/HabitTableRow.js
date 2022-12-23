import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  MenuItem,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
// utils
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
//

// ----------------------------------------------------------------------

HabitTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function HabitTableRow({
                                        row,
                                        onEditRow,
                                        onSelectRow,
                                        selected,
                                        onViewRow,
                                        onDeleteRow,
                                        updateDaysData
                                      }) {
  const theme = useTheme();
  const { id, name, habitDays } = row;
  const [habitDaysTable, setDaysTable] = useState(habitDays)
  const {updateDays, setUpdateDays} = updateDaysData

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleSelectCheckbox = (day) => {
    console.log(day.status)
    let changeHabit = {...day, status: !day.status};
    let editDay = habitDaysTable.map(d => d.id === day.id ? {...d, status: !d.status} : d)
    setDaysTable(editDay);
    let updateDaysNew = updateDays
    let find = updateDaysNew.find(d => d.id === day.id);
    if (find) {
      updateDaysNew = updateDays.map(d => d.id === find.id ?  {...d, status: !d.status} : d)
    } else {
      updateDaysNew.push(changeHabit)
    }
    console.log(updateDaysNew)
    setUpdateDays(updateDaysNew);
  };

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow}/>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      {
        habitDays.map(day => (
          <TableCell key={day.id}>
            <Typography variant="subtitle2" noWrap>
              <Checkbox checked={habitDaysTable.find(d => day.date === d.date).status}
                        onClick={() => handleSelectCheckbox(day)}/>
            </Typography>
          </TableCell>
        ))
      }

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'}/>
                Удалить
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'}/>
                Подробнее
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'}/>
                Изменить
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}