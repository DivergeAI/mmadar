import { AddOutlined, ArrowUpwardOutlined, FileUploadSharp, Mic } from "@mui/icons-material";
import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useState, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import Text from "../../components/common/Text";
import UploadFileDisplay from "../../components/common/Sidebar/UploadFileDisplay";

function SearchSection() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddFiles = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      const existingFiles = files;
      const updatedFiles = [...existingFiles, ...Array.from(newFiles)];
      setFiles(updatedFiles);
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Fragment>
      <Box
        component="form"
        display={"flex"}
        width={"100%"}
        gap={2}
        alignItems={"center"}
      >
        <Box
          sx={{
            width: "100%",
            padding: "0.5rem 1.25rem",
            borderRadius: "1.5rem",
            backgroundColor: theme.palette.grey[200],
          }}
        >
          <Stack direction="row" spacing={1} width="100%" useFlexGap flexWrap="wrap">
            {files.map((file, index) => (
              <UploadFileDisplay key={index} file={file} />
            ))}
          </Stack>

          <TextField
            variant="outlined"
            placeholder="Search"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="More">
                    <IconButton onClick={handleAddFiles}>
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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: ".75rem",
            border: `1px solid ${theme.palette.grey[200]}`,
            padding: "0.25rem",
            maxWidth: "200px",
          },
        }}
      >
        <Box display={"flex"} gap={1}>
          <IconButton
            sx={{
              padding: "0.5rem 0.75rem !important",
            }}
            onClick={handleUploadFiles}
          >
            <Icon fontSize="small">
              <FileUploadSharp />
            </Icon>
            <Text
              sx={{
                minWidth: "fit-content",
                maxWidth: "100%",
                ml: "0.5rem",
                mr: "2rem",
              }}
            >
              Upload Files
            </Text>
          </IconButton>
        </Box>
      </Popover>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Fragment>
  );
}

export default SearchSection;
