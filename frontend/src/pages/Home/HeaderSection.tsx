import { AdminPanelSettings, ArchiveOutlined, Close, Code, Download, LogoutRounded, MoreHoriz, MoreVert, Search, SettingsOutlined, Share } from "@mui/icons-material";
import { Avatar, Box, DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, MenuItem, Stack, TextField, Toolbar, Tooltip } from "@mui/material";
import  { Fragment, useState } from "react";
import SelectMenu from "../../components/common/SelectMenu";
import { options } from "../../components/common/Sidebar/ChatItem";
import Text from "../../components/common/Text";
import CustomDialog from "../../components/common/CustomDialog";
import ArchivedChatDialog from "./ArchivedChatDialog";

const shareOptions = [
    {
        name: 'Share',
        icon: <Share />,
        onClick: () => console.log('Share clicked')
    },
    {
        name: 'Download',
        icon: <Download />,
        onClick: () => console.log('Download clicked')
    },
]



const HeaderSection = () => {
  const [isArchivedChats, setIsArchivedChats] = useState(false);

  const controls = [
    {
        name: 'Settings',
        icon: <SettingsOutlined />,
        onClick: () => console.log('Settings clicked')
    },
    {
        name: 'Archived Chats',
        icon: <ArchiveOutlined />,
        onClick: () => setIsArchivedChats(true)
    },
    {
      name: 'Playground',
      icon: <Code />,
      onClick: () => console.log('Settings clicked')
  },
  {
      name: 'Admin Panel',
      icon: <AdminPanelSettings />,
      onClick: () => console.log('More clicked'),
      divider : true
  },
 
    {
        name: 'Sign Out',
        icon: <LogoutRounded />,
        onClick: () => console.log('More clicked'),
        divider : true
    },
    {
      name: 'Active Users',
      icon: <MoreHoriz />,
      onClick: () => console.log('More clicked')
  },

  
]

  return (
    <Fragment>
<Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box>
        <Box width={"100px"}>
          <TextField
          fullWidth
            variant='outlined'
            select
            placeholder="Select Model"
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                paddingRight: '32px', // Adjust padding to make room for the icon
              },
              '& .MuiSelect-icon': {
                fontSize: '1rem', // Change the icon size here
                width: '24px',
                height: '24px',
              },
              '& .MuiSelect-root': {
                height: '40px',
                padding: '0 10px', // Adjust padding as needed
              },
              '& fieldset': {
                border: 'none',
              },
              direction: 'rtl',
            }}
          >
            <MenuItem
              value=''
              disabled
            >
              <Text fontSize="18px" fontWeight="600">Select Model</Text>
            </MenuItem>
            {/* Add your options here */}
          </TextField>
        </Box>
      </Box>

      {/* right Controls */}
      <Stack direction={'row'} gap={2} alignItems={'center'}>
        {/* more icon */}
        <SelectMenu options={shareOptions} />
        {/* controls */}
        <Tooltip title="Controls">
          <IconButton>
            <Icon>
              <SettingsOutlined />
            </Icon>
          </IconButton>
        </Tooltip>

        {/* settings */}
        <SelectMenu options={controls} icon={<Avatar sx={{ width: 24, height: 24 }} />} />
      </Stack>
     
    </Box>
    {isArchivedChats && (
<ArchivedChatDialog isOpen={isArchivedChats} onClose={()=> setIsArchivedChats(false)} />
      )}
    </Fragment>
    
  );
};

export default HeaderSection;
