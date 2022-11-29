import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  Checkbox,
  TableCell,
  Typography,
  MenuItem,
  Box
} from '@mui/material';
// utils
import { fDate, fDateTime } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import ReactMarkdown from 'react-markdown';
import Markdown from '../../../../components/Markdown';
//

// ----------------------------------------------------------------------

GoalTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function GoalTableRow({
                                       row,
                                       selected,
                                       onEditRow,
                                       onSelectRow,
                                       onViewRow,
                                       onDeleteRow
                                     }) {
  const theme = useTheme();

  const { title, finishTitle, status, goalGroup, endDate } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {finishTitle}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="subtitle2" noWrap>
          {status}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="subtitle2" noWrap>
          {goalGroup.name}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Typography variant="subtitle2" noWrap>
          {endDate != null ? fDateTime(endDate) : 'Не установлена'}
        </Typography>
      </TableCell>

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
                <Iconify icon={'eva:trash-2-outline'} />
                Удалить
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                Подробнее
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Изменить
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}