import { AddOutlined, ArrowUpwardOutlined, Mic } from "@mui/icons-material";
import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";

function SearchSection() {
  const theme = useTheme();
  return (
    <Box
      component="form"
      display={"flex"}
      width={"100%"}
      gap={2}
      alignItems={"center"}
    >
      {/* search box */}
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem 1.25rem",
          borderRadius: "1.5rem",
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="More">
                  <IconButton>
                    <Icon fontSize="small">

                    <AddOutlined />
                    </Icon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Record Voice">
                  <IconButton>
                    <Icon fontSize="small">
                      <Mic />   
                    </Icon>
                  </IconButton>
                </Tooltip>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          padding: "1rem",
          borderRadius: "64rem",
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        }}
      >
        <Tooltip title="Upload Image">
          <IconButton
            sx={{
              color: theme.palette.common.white,
            }}
          >
            <Icon>

            <ArrowUpwardOutlined />
            </Icon>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default SearchSection;
