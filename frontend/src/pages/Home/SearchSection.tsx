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
import { transcribeAudio } from "../../api/audio";
import { blobToFile } from "../../utils/functions";
import { uploadFile } from "../../api/files";
import { API_BASE_URL, SUPPORTED_FILE_EXTENSIONS, SUPPORTED_FILE_TYPE } from "../../utils/constants";
import { processDocToVectorDB } from "../../api/rag";
import { FileItem } from "../../types/chat";



type SearchSectionProps = {
  search: string;
  setSearch: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  stopResponse: () => void
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
};

function SearchSection({ search, setSearch, handleSubmit, stopResponse,files,setFiles }: SearchSectionProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
  // uploadFileHanlder
  const uploadFileHandler = async (file: File) => {
    // Check if the file is an audio file and transcribe/convert it to text file
    if (['audio/mpeg', 'audio/wav'].includes(file.type)) {
      const res = await transcribeAudio(localStorage.token, file).catch((error) => {
        toast.error(error);
        return null;
      });

      if (res) {
        console.log(res);
        const blob = new Blob([res.text], { type: 'text/plain' });
        file = blobToFile(blob, `${file.name}.txt`);
      }
    }

    const fileItem: FileItem = {
      type: 'file',
      file: '',
      id: null,
      url: '',
      name: file.name,
      collection_name: '',
      status: '',
      size: file.size,
      error: ''
    };
    setFiles((prevFiles) => [...prevFiles, fileItem]);

    try {
      const uploadedFile = await uploadFile(localStorage.token, file);

      if (uploadedFile) {
        fileItem.status = 'uploaded';
        fileItem.file = uploadedFile;
        fileItem.id = uploadedFile.id;
        fileItem.url = `${API_BASE_URL}/files/${uploadedFile.id}`;

        // TODO: Check if tools & functions have files support to skip this step to delegate file processing
        // Default Upload to VectorDB
        if (
          SUPPORTED_FILE_TYPE.includes(file.type) ||
          SUPPORTED_FILE_EXTENSIONS.includes(file.name.split('.').pop()!)
        ) {
          processFileItem(fileItem);
        } else {
          // toast.error(
          //   i18n.t(`Unknown file type '{{file_type}}'. Proceeding with the file upload anyway.`, {
          //     file_type: file.type
          //   })
          // );
          processFileItem(fileItem);
        }
      } else {
        setFiles((prevFiles) => prevFiles.filter((item) => item.status !== null));
      }
    } catch (e) {
      // toast.error(e);
      setFiles((prevFiles) => prevFiles.filter((item) => item.status !== null));
    }
  };

  // processFileItem
  const processFileItem = async (fileItem: FileItem) => {
    try {
      const res = await processDocToVectorDB(localStorage.token, fileItem.id!);

      if (res) {
        fileItem.status = 'processed';
        fileItem.collection_name = res.collection_name;
        setFiles((prevFiles:FileItem[]) => [...prevFiles]);
      }
    } catch (e) {
      // Remove the failed doc from the files array
      // setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileItem.id));
      // toast.error(e);
      fileItem.status = 'processed';
      setFiles((prevFiles:FileItem[]) => [...prevFiles]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      const existingFiles = files;
      const updatedFiles = [...existingFiles, ...Array.from(newFiles)];
      if (updatedFiles.length > 0) {
        updatedFiles?.forEach((file) => {
          if (['image/gif', 'image/webp', 'image/jpeg', 'image/png'].includes(file['type'])) {
            // image functionality herer
          } else {
            uploadFileHandler(file);
          }

        })
      } else {
        console.log("no files")
      }
      setAnchorEl(null);
    }
  };



  return (
    <Fragment>
      <Box
        onSubmit={handleSubmit}
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
          {files?.length > 0 && <Stack direction="row" mb={1} spacing={1} width="100%" useFlexGap flexWrap="wrap">
            {files.map((file, index) => (
              <UploadFileDisplay key={index} file={file} removeFile={() => {
                setFiles((prevFiles) => prevFiles.filter((item) => item.id !== file.id));
              }} />
            ))}
          </Stack>}

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                    <IconButton onClick={stopResponse}>
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
          <Tooltip title="Send message">
            <IconButton
              type="submit"
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
