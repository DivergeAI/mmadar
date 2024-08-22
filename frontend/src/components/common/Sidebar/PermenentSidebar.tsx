import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { drawerWidth } from ".";
import Text from "../Text";
import SearchIcon from "@mui/icons-material/Search";

const ChatItem = () =>{
    const theme = useTheme();
    return (
            <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.grey[300],
                  borderRadius: "12px",
                },
                flexGrow: 1,
              }}
            >
               
                <Text fontWeight="500" color={theme.palette.grey[800]}>
                WorkSpace
                </Text>

                <img
                src="../src/assets/svgs/workspace.svg"
                alt=""
                width={"17.6px"}
                height={"17.6px"}
                style={{
                    marginLeft: "auto",
                }}
                />
            </Box>
    )
}

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
        height={"100%"}
        role="presentation"
        boxSizing={"border-box"}
      >
        {/* logo & new Chat */}

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          gap={1}
        >
          {/* left  */}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            p={1}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
                borderRadius: "12px",
              },
              flexGrow: 1,
            }}
            width={"100%"}
          >
            <img
              src="../src/assets/favicon.png"
              alt=""
              width={"24px"}
              height={"24px"}
            />
            <Text fontWeight="500" color={theme.palette.grey[800]}>
              New Chat
            </Text>
            <img
              src="../src/assets/svgs/edit.svg"
              alt=""
              width={"20px"}
              height={"20px"}
              style={{
                marginLeft: "auto",
              }}
            />
          </Box>
          {/* right Button  */}
          <Box
            display={"flex"}
            alignItems={"center"}
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
              width={"20px"}
              height={"20px"}
              style={{
                alignSelf: "center",
              }}
            />
          </Box>
        </Box>

        {/* WorkSpace */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
                borderRadius: "12px",
              },
              flexGrow: 1,
            }}
          >
            <img
              src="../src/assets/svgs/workspace.svg"
              alt=""
              width={"17.6px"}
              height={"17.6px"}
            />
            <Text fontWeight="500" color={theme.palette.grey[800]}>
              WorkSpace
            </Text>
          </Box>
        </Box>

        {/* Search */}

        <Box
          sx={{
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search"
            // size="small"
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

        {/* chats */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }} >
            {[1,2,3,4,5,6,7,8,9,10].map((item:any) => <ChatItem />)}
          </Box>

      </Box>
    </Drawer>
  );
}

export default PermenentSidebar;
