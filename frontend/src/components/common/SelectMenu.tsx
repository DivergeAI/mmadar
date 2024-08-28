import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHoriz } from '@mui/icons-material';
import { Divider, Icon, ListItemIcon, useTheme } from '@mui/material';
import Text from './Text';

const ITEM_HEIGHT = 48;

interface MenuOption {
  name: string;
  onClick: () => void;
  icon?: React.ReactNode;
  divider?: boolean;
}

interface SelectMenuProps {
  options: MenuOption[];
  icon?: React.ReactNode;
  menuStyle?: React.CSSProperties;
}

export default function SelectMenu({
  options,
  icon = <MoreHoriz />,
  menuStyle,
}: SelectMenuProps) {
    const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: MenuOption) => {
    option.onClick();
    handleClose();
  };

  return (
    <div >
      <IconButton
        aria-label="more"
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
            padding : '0 !important',
            backgroundColor : 'transparent !important',
            width : '24px',
            height : '24px',
        }}
      >
        {icon}
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
            paper:{
                sx: {
                    // maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    border : `1px solid ${theme.palette.grey[300]}`,
                    backgroundColor : theme.palette.background.default,
                    ...menuStyle,
                  },
            }
          
        }}
      >
        {options.map((option) => (
          <>
           <MenuItem key={option.name} onClick={() => handleOptionClick(option)}>
          {option?.icon &&   <ListItemIcon sx={{
                color: theme.palette.grey[800],
                width: '16px',
                height: '16px',
          }}>{option.icon}
            </ListItemIcon>}
            <Text>

            {option.name}
            </Text>
          </MenuItem>
          {option?.divider && <Divider />}
          </>
         
        ))}
      </Menu>
    </div>
  );
}
