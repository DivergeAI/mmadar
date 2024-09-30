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
import { AdminPanelSettings, ArchiveOutlined, Code, LogoutRounded, MoreHoriz, SettingsOutlined } from "@mui/icons-material";
import { useState } from "react";
import SettingsModal from "../../Settings";
import { getAllChatTags, getChatList, getChatListByTagName } from "../../../api/chats";
import {  useQuery } from "@tanstack/react-query";
import UniversalButton from "../UniversalButton";


function PermenentSidebar() {
  let token: string|undefined = localStorage.getItem('token') || undefined;
  const theme = useTheme();
  const navigate = useNavigate()
  const [openSetting, setOpenSetting] = useState(false)

  const { data: AllChats } = useQuery({
    queryKey: ['chatList'],
    queryFn: () => getChatList(token),
    retry: 1
  })

  const { data: AllPinnedTags } = useQuery({
    queryKey: ['pinnedTags'],
    queryFn: () => getChatListByTagName(token, 'pinned'),
    retry: 1
  })

  const { data: AllTags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getAllChatTags(token),
    retry: 1
  })

  const controls = [
    {
      name: "Settings",
      icon: <SettingsOutlined />,
      onClick: () => setOpenSetting(true),
    },
    {
      name: "Archived Chats",
      icon: <ArchiveOutlined />,
      onClick: () => { }
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
Documents            </Text>
          </Box>
        </Box>

        {/* Search */}
        <Box sx={{}}>
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{
                  marginRight: 0,
                }}>
                  <Icon fontSize = 'small'>
                    <SearchIcon />
                  </Icon>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                lineHeight: "1rem",
                
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
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
            // p: .5,
          }}
        >
          <Box>
            {AllTags?.length > 0 && <UniversalButton
              label={'all'}
              backgroundColor="transparent"
              border="none"
              textColor="grey.800"
              fontSize={'.75rem'}
              sx={{
                minWidth: 'fit-content',
                lineHeight: '1rem',
                padding: '0 .5rem'
              }}
            />}
            {AllTags?.length > 0 && AllTags.map((tag: any, index: number) => (
              <UniversalButton
                label={tag.name !== 'pinned' && tag.name}
                backgroundColor="transparent"
                border="none"
                textColor="grey.800"
                fontSize={'.75rem'}
                sx={{
                  minWidth: 'fit-content',
                  lineHeight: '1rem',
                  padding: '0 .5rem'
                }}
              />
            ))}
          </Box>

          {/* Pinned */}

          {AllPinnedTags?.length > 0 &&
            <Box
              display={'flex'}
              flexDirection={'column'}
              gap={'.2rem'}>
              <Text fontSize='.75rem' fontWeight="600" color={theme.palette.grey[700]} sx={{ my: 1 }}>
                Pinned    </Text>

              {AllPinnedTags.map((chat: any, index: number) => (

                <ChatItem key={chat.id} data={chat} index={index} />

              ))}
            </Box>
          }
          <Box display={'flex'}
            flexDirection={'column'}
            gap={'.2rem'}>

            {AllChats?.length > 0 && AllChats.map((chat: any, index: number) => (
              <Box
                key={chat.id}
              >
                {chat?.time_range !== AllChats[index - 1]?.time_range &&
                  <Text fontSize='.75rem' fontWeight="600" color={theme.palette.grey[700]} sx={{ my: 1 }}>
                    {chat?.time_range}
                  </Text>
                }

                <ChatItem data={chat} />

              </Box>
            ))}
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
            icon={<Box display="flex" alignItems="center" gap={2}> <Avatar />
              <Text fontWeight="600" color={theme.palette.grey[800]}>
                User Name
              </Text>
            </Box>}
          />

        </Box>
      </Box>
      <SettingsModal
        open={openSetting}
        onClose={() => setOpenSetting(false)}
      />
    </Drawer>
  );
}

export default PermenentSidebar;
