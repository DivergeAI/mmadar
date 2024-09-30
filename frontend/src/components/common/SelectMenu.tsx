import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Divider, ListItemIcon, ListSubheader, TextField, useTheme } from '@mui/material';
import Text from './Text';
import AddTags from './AddTags';

interface MenuOption {
  name: string;
  onClick: () => void;
  icon?: React.ReactNode;
  divider?: boolean;
  tag?: boolean;

}

interface SelectMenuProps {
  options: MenuOption[];
  icon?: React.ReactNode;
  menuStyle?: React.CSSProperties;
  tags?: any[];
}

export default function SelectMenu({
  options,
  icon = <MoreHoriz sx={{
    width : '24px',
    height : '24px'
  }} />,
  menuStyle,
  tags,
}: SelectMenuProps) {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [inputValue, setInputValue] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.currentTarget.closest('#chat-item')?.classList.add('menu-open');
  };

  const handleClose = () => {
    setAnchorEl(null);
    document.querySelector('#chat-item.menu-open')?.classList.remove('menu-open');
  };

  const handleOptionClick = (option: MenuOption) => {
    option.onClick();
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding: '0 !important',
          backgroundColor: 'transparent !important',
        }}
      >
        {icon}
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onKeyDown={(e) => {
          if (e.key !== "Escape") {
            e.stopPropagation();
          }
        }}
        slotProps={{
          paper: {
            sx: {
              '& .MuiList-root': {
                padding: '0 !important',
              },
              padding: '0.25rem !important',
              width: '20ch',
              borderRadius:'.75rem',
              border: `1px solid ${theme.palette.grey[300]}`,
              backgroundColor: theme.palette.background.default,
              ...menuStyle,
            },
          },
        }}
      >
        {options.map((option) => (
         [
            <MenuItem onClick={() => handleOptionClick(option)}
            sx={{
              padding:'.5rem .75rem !important',
              gap : '.5rem',
              borderRadius:'.5rem',
            }}>
              {option?.icon && (
                <ListItemIcon
                  sx={{
                    color: theme.palette.grey[800],
                    width: '16px',
                    height: '16px',
                    minWidth : 'fit-content !important',
                  }}
                >
                  {option.icon}
                </ListItemIcon>
              )}
              <Text fontSize='.875rem' fontWeight='500'>{option.name}</Text>
            </MenuItem>,
           option?.divider &&   <Divider />
            ]
        ))}

        {/* Add input field after the divider */}
        
 {tags && <Box m={1}>

  <AddTags label={false} tags={tags} sx={{
    backgroundColor : 'transparent !important',
    border : `1px solid ${theme.palette.grey[300]}`,
    height : '0',
    '& .MuiChip-label':{
      '-webkit-line-clamp': 1,
      overFlow : 'hidden',
      fontSize : '.7rem !important',
      fontWeight : '500 !important',
      fontFamily : 'system-ui !important',
      color : 'commom.black',
    }
  }}/>
 </Box>}


      </Menu>
    </div>
  );
}



// option?.tag && (
//   <ListSubheader key={option.name + '-tags'}>
//   <AddTags label={false} tags={[]} />
// </ListSubheader>
// )