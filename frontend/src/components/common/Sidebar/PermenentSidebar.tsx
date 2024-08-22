import {
  Box,
  Drawer,
  TextField,
  useTheme,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { drawerWidth } from ".";
import Text from "../Text";
import SearchIcon from "@mui/icons-material/Search";
import ChatItem from "./ChatItem";
import SelectMenu from "../SelectMenu";

const   options=[
  { name: 'Profile', onClick: () => console.log('Profile clicked') },
  { name: 'Settings', onClick: () => console.log('Settings clicked') },
  { name: 'Logout', onClick: () => console.log('Logout clicked') }
]

function PermenentSidebar() {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          height: "100vh", // Set height to full viewport
          background: theme.palette.background.paper,
          border: 0,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
      }}
    >
      <Box
        p={1}
        width="100%"
        height="100%" // Make the Box take full height
        display="flex"
        flexDirection="column"
        boxSizing={"border-box"}
      >
        {/* Logo & New Chat */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          p={1}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              borderRadius: "12px",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
            <img
              src="../src/assets/favicon.png"
              alt=""
              width="24px"
              height="24px"
            />
            <Text fontWeight="500" color={theme.palette.grey[800]}>
              New Chat
            </Text>
            <img
              src="../src/assets/svgs/edit.svg"
              alt=""
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
              alt=""
              width="20px"
              height="20px"
            />
          </Box>
        </Box>

        {/* WorkSpace */}
        <Box
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
              alt=""
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
                  <SearchIcon />
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

        {/* Chats - This is the scrollable area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 1,
          }}
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <ChatItem key={index} />
          ))}
        </Box>

        {/* Bottom */}
        <Box
          sx={{
            p: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              borderRadius: "12px",
            },
            mt:2
          }}>
          <Box display="flex" alignItems="center" gap={2}>
          <SelectMenu  options={options} icon = { <Avatar />}/>

            <Text fontWeight="600" color={theme.palette.grey[800]}>
             User Name
            </Text>
          </Box>

        </Box>
      </Box>
    </Drawer>
  );
}

export default PermenentSidebar;
