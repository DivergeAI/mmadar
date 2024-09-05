import {
  Box,
  Drawer,
  TextField,
  useTheme,
  InputAdornment,
  Avatar,
  Icon,
} from "@mui/material";
import { drawerWidth } from ".";
import Text from "../Text";
import SearchIcon from "@mui/icons-material/Search";
import ChatItem from "./ChatItem";
import { NavLink, useNavigate } from "react-router-dom";
import SelectMenu from "../SelectMenu";
import { AdminPanelSettings, ArchiveOutlined, BookmarkBorderOutlined, Code, CreateOutlined, LogoutRounded, MoreHoriz, SettingsOutlined } from "@mui/icons-material";


function PermenentSidebar() {
  const theme = useTheme();
  const navigate = useNavigate()

  const controls = [
    {
      name: "Settings",
      icon: <SettingsOutlined />,
      onClick: () => console.log("Settings clicked"),
    },
    {
      name: "Archived Chats",
      icon: <ArchiveOutlined />,
      onClick : ()=>{}
    },
    {
      name: "Playground",
      icon: <Code />,
      onClick: () => console.log("Settings clicked"),
    },
    {
      name: "Admin Panel",
      icon: <AdminPanelSettings />,
      onClick: () => navigate('/admin'),
      divider: true,
    },
    {
      name: "Sign Out",
      icon: <LogoutRounded />,
      onClick: () => console.log("More clicked"),
      divider: true,
    },
    {
      name: "Active Users",
      icon: <MoreHoriz />,
      onClick: () => console.log("More clicked"),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          height: "100vh", // Full viewport height
          background: theme.palette.background.paper,
          border: 0,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
      }}
    >
      <Box
        py={1}
        px={1.5}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        boxSizing="border-box"
      >
        {/* Logo & New Chat */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Box 
          component={NavLink}
          to="/"
          display="flex" alignItems="center" p={1} gap={2} flexGrow={1}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              borderRadius: "12px",
            },
          }}>
            <img
              src="../src/assets/favicon.png"
              alt="Logo"
              width="24px"
              height="24px"
            />
            <Text fontWeight="500" color={theme.palette.grey[800]}>
              New Chat
            </Text>
            <img
              src="../src/assets/svgs/edit.svg"
              alt="Edit"
              width="20px"
              height="20px"
              style={{ marginLeft: "auto" }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
                borderRadius: "12px",
              },
              p: 1,
            }}
          >
            <img
              src="../src/assets/svgs/humburger.svg"
              alt="Menu"
              width="20px"
              height="20px"
            />
          </Box>
        </Box>

        {/* WorkSpace */}
        <Box
        component={NavLink}
        to="/workspace"
          sx={{
            p: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              borderRadius: "12px",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src="../src/assets/svgs/workspace.svg"
              alt="Workspace"
              width="17.6px"
              height="17.6px"
            />
            <Text fontWeight="500" color={theme.palette.grey[800]}>
              WorkSpace
            </Text>
          </Box>
        </Box>

        {/* Search */}
        <Box sx={{ p: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <SearchIcon />
                  </Icon>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none !important",
              },
              "& fieldset": {
                border: "none !important",
              },
            }}
          />
        </Box>

        {/* Chats - Scrollable Area */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
            p: 1,
          }}
        >
          {/* {Array.from({ length: 15 }).map((_, index) => (
            <ChatItem key={index} />
          ))} */}
          <Box 
          display={'flex'}
          flexDirection={'column'}
          gap={.5}>
  <Text fontSize = 'small' fontWeight="500" color={theme.palette.grey[500]}>
    Recent Chats
    </Text>

  <ChatItem to="/chat/1" chatName="Chat 1" />
  <ChatItem to="/chat/2" chatName="Chat 2" />
  <ChatItem to="/chat/3" chatName="Chat 3" />
</Box>
        </Box>

        {/* Bottom - User Avatar and Menu */}
        <Box
          sx={{
            p: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              borderRadius: "12px",
            },
            mt: 2,
          }}
        >
         
            <SelectMenu 
            options={controls}
            icon={ <Box display="flex" alignItems="center" gap={2}> <Avatar />
            <Text fontWeight="600" color={theme.palette.grey[800]}>
              User Name
            </Text>
          </Box>}
          />
           
        </Box>
      </Box>
    </Drawer>
  );
}

export default PermenentSidebar;
