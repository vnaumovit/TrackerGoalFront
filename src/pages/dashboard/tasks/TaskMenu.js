import { useState } from 'react';
import { Divider, IconButton, MenuItem } from '@mui/material';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

export default function TaskMenu({ onMethods }) {
  const [open, setOpen] = useState(null);
  const onEditRow = onMethods.onEditRow
  const onSelected = onMethods.onSelected
  const onDeleteRow = onMethods.onDeleteRow

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20}/>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 'auto',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75
          }
        }}
      >
        <MenuItem onClick={() => onSelected()}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ ...ICON }}/>
          Mark Complete
        </MenuItem>

        <MenuItem onClick={() => onEditRow()}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }}/>
          Edit
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }}/>
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }}/>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => onDeleteRow()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }}/>
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}