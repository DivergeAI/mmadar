import UniversalButton from "../../../components/common/UniversalButton";
import {
  Icon,
  IconButton,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import Text from "../../../components/common/Text";
import {
  Check,
  Download,
  KeyboardArrowDown,
  Update,
  Upload,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState, useRef ,Fragment} from "react";

const ModelsSettingAdmin = () => {
  const theme = useTheme();
  const selectModelFileRef = useRef<HTMLInputElement | null>(null);
  const [selectModelFile, setSelectModelFile] = useState<File | null>(null);

  const [isExperiment, setIsExperiment] = useState({
    isOpen: false,
   typeFile: true,
  });

//   handle File Change
  const handleClickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e?.target?.files?.[0];
    if (file) {
      setSelectModelFile(file);
    }
  };

//   handle Upload model File button Click 
  const handleUploadModelFileChange = () => {
    if (selectModelFileRef.current) {
      selectModelFileRef.current.click();
    }
  };
  return (
    <Stack height={"100%"} component={"form"}>
<Stack gap={1} height={'100%'} flex={"1 1 auto"}
      sx={{
        overflowY :'auto'
      }}>        {/* Manage Ollama Models */}
        <Text fontSize=".87rem" fontWeight="500">
        Manage Ollama Models
        </Text>
        <Stack direction={"row"} gap={1}>
          <Select
            value={"mixtral:latest"}
            size="small"
            variant="outlined"
            fullWidth
            IconComponent={KeyboardArrowDown}
            renderValue={(value) => value}
            MenuProps={{
              PaperProps: {
                sx: {
                  // width: "fit-content",
                  fontSize: ".875rem",
                  border: `1px solid ${theme.palette.grey[500]}`,
                  backgroundColor: "grey.400",
                  boxShadow: "none",
                  // height: "fit-content",
                  padding: "0",
                  "& .MuiList-root": {
                    padding: ".2rem",
                  },
                },
              },
              autoFocus: false,
              anchorOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
            sx={{
              "& .MuiSelect-select": {
                fontSize: ".875rem",
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
                whiteSpace: "nowrap",
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          >
            {["mixtral:latest"].map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  fontSize: ".875rem",
                  whiteSpace: "nowrap",
                  padding: ".3rem 1rem",
                  // borderRadius: ".5rem",
                  "&:hover": {
                    borderRadius: ".5rem",
                    color: "common.white",
                    backgroundColor: "primary.light",
                  },
                  "&.Mui-selected": {
                    borderRadius: ".5rem",
                    backgroundColor: "transparent",
                    "&:hover": {
                      color: "common.white",
                      backgroundColor: "primary.light",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    visibility: "visible",
                    minWidth: "fit-content !important",
                    width: "1rem",
                    color: "inherit",
                    mr: 0.3,
                  }}
                >
                  <Check fontSize="small" />
                </ListItemIcon>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Tooltip title="Update All Models" placement="top">
            <IconButton sx={{ backgroundColor: "grey.200" }}>
              <Icon fontSize="small">
                <Update />
              </Icon>
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Put Model from Ollama.com */}

        <Text fontSize=".87rem" fontWeight="500">
          Pull a model from Ollama.com
        </Text>
        <Stack direction={"row"} gap={1}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter Model tag (e.g. mistal:7b)"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          />

          <IconButton sx={{ backgroundColor: "grey.200" }}>
            <Icon fontSize="small">
              <Download />
            </Icon>
          </IconButton>
        </Stack>
        <Text fontSize=".75rem" fontWeight="500" color="grey.700">
          To access the available model names for downloading,
          <NavLink
            to={"#"}
            style={{
              color: theme.palette.grey[900],
              textDecoration: "underline",
              fontWeight: "500",
              marginLeft: ".1rem",
            }}
          >
            click here.
          </NavLink>
        </Text>

        {/* Delete a Model */}
        <Text fontSize=".87rem" fontWeight="500">
          Delete a model
        </Text>
        <Stack direction={"row"} gap={1}>
          <Select
            value={""}
            displayEmpty
            size="small"
            variant="outlined"
            fullWidth
            IconComponent={KeyboardArrowDown}
            renderValue={(value) => value || "Select a model"}
            MenuProps={{
              PaperProps: {
                sx: {
                  // width: "fit-content",
                  fontSize: ".875rem",
                  border: `1px solid ${theme.palette.grey[500]}`,
                  backgroundColor: "grey.400",
                  boxShadow: "none",
                  // height: "fit-content",
                  padding: "0",
                  "& .MuiList-root": {
                    padding: ".2rem",
                  },
                },
              },
              autoFocus: false,
              anchorOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
            sx={{
              "& .MuiSelect-select": {
                fontSize: ".875rem",
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
                whiteSpace: "nowrap",
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          >
            <MenuItem
              disabled
              value=""
              sx={{
                fontSize: ".875rem",
                whiteSpace: "nowrap",
                padding: ".3rem 1rem",
                // borderRadius: ".5rem",
                "&:hover": {
                  borderRadius: ".5rem",
                  color: "common.white",
                  backgroundColor: "primary.light",
                },
                "&.Mui-selected": {
                  borderRadius: ".5rem",
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "common.white",
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  visibility: "visible",
                  minWidth: "fit-content !important",
                  width: "1rem",
                  color: "inherit",
                  mr: 0.3,
                }}
              >
                <Check fontSize="small" />
              </ListItemIcon>
              Select a model
            </MenuItem>

            {["mixtral:latest"].map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  fontSize: ".875rem",
                  whiteSpace: "nowrap",
                  padding: ".3rem 1rem",
                  // borderRadius: ".5rem",
                  "&:hover": {
                    borderRadius: ".5rem",
                    color: "common.white",
                    backgroundColor: "primary.light",
                  },
                  "&.Mui-selected": {
                    borderRadius: ".5rem",
                    backgroundColor: "transparent",
                    "&:hover": {
                      color: "common.white",
                      backgroundColor: "primary.light",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    visibility: "visible",
                    minWidth: "fit-content !important",
                    width: "1rem",
                    color: "inherit",
                    mr: 0.3,
                  }}
                >
                  <Check fontSize="small" />
                </ListItemIcon>
                {option}
              </MenuItem>
            ))}
          </Select>

          <IconButton sx={{ backgroundColor: "grey.200" }}>
            <Icon fontSize="small">
              <Update />
            </Icon>
          </IconButton>
        </Stack>

        {/* create a Model */}

        <Text fontSize=".87rem" fontWeight="500">
          Create a model
        </Text>
        <Stack direction={"row"} gap={1}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter Model tag (e.g. my-modelfile)"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          />

          <IconButton sx={{ backgroundColor: "grey.200" }}>
            <Icon fontSize="small">
              <Upload />
            </Icon>
          </IconButton>
        </Stack>
        {/* Create Model textArea */}
        <Stack direction={"row"} gap={1}>
          <TextField
            placeholder={`TEMPLATE &quot;&quot;&quot;{{ .System }}
            USER: {{ .Prompt }}
            ASSISTANT: &quot;&quot;&quot;
            PARAMETER num_ctx 4096
            PARAMETER stop &quot;</s>&quot;
            PARAMETER stop &quot;USER:&quot;
            PARAMETER stop &quot;ASSISTANT:&quot;`}
            multiline
            rows={6}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "system-ui",
                fontSize: ".875rem",
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
                lineHeight: "1.5",
                "&:placeholder": {
                  fontSize: "1rem !important",
                  fontFamily: "system-ui",
                },
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          />
          <IconButton
            sx={{ backgroundColor: "grey.200", visibility: "hidden" }}
          >
            <Icon fontSize="small">
              <Upload />
            </Icon>
          </IconButton>
        </Stack>

        {/* Experiment */}

        <Stack
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize=".87rem"
            fontWeight="500"
            sx={{
              width: "100%",
            }}
          >
            Experiment
          </Text>
          <UniversalButton
          label={isExperiment?.isOpen ? "Hide" : "Show"}
          onClick={() => setIsExperiment((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
          variant="outlined"
            border="none"
            width="fit-content"
            fontSize="12px"
            textColor="common.black"
            backgroundColor="transparent"
            sx={{
              fontWeight: "500",
              minWidth: "fit-content",
              ml: 1,
              padding: "0",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disableRipple={true} // This prop will be automatically passed
          />
        </Stack>

        {/* upload a GGuF model when experiment is true */}
{
    isExperiment?.isOpen ? 
    (
        <Fragment>
             <Stack
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".87rem" fontWeight="500">
            Upload a GGuF model
          </Text>
          <UniversalButton
            label="File Mode"
            variant="outlined"
            border="none"
            width="fit-content"
            fontSize="12px"
            textColor="common.black"
            backgroundColor="transparent"
            sx={{
              fontWeight: "500",
              minWidth: "fit-content",
              ml: 1,
              // padding :'0',
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disableRipple={true} // This prop will be automatically passed
            onClick={() => setIsExperiment((prev) => ({ ...prev, typeFile: !prev.typeFile }))}
            />
        </Stack>
        {isExperiment?.typeFile === false ? (
          <TextField
            variant="outlined"
            size="small"
            placeholder="Type Hugging Face Resolve (Download) URL"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "grey.200",
                borderRadius: ".5rem",
              },
              "& fieldSet": {
                border: "none !important",
              },
            }}
          />
        ) : (
          <UniversalButton
            label={
              selectModelFile
                ? `1 documents(s) selected`
                : "Click here to select"
            }
            border="none"
            textColor="common.black"
            onClick={handleUploadModelFileChange}
            fontSize={"small"}
            backgroundColor="grey.200"
            sx={{
                fontWeight: "500",
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              lineHeight: "1.25rem",
              py: ".5rem",
              borderRadius: ".75rem",
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
              },
            }}
          />
        )}
        <Text fontSize=".75rem" fontWeight="500" color="grey.700">
          To access the GGUF models available for downloading,
          <NavLink
            to={"#"}
            style={{
              color: theme.palette.grey[900],
              textDecoration: "underline",
              fontWeight: "500",
              marginLeft: ".1rem",
            }}
          >
            click here.
          </NavLink>
        </Text>
            </Fragment>
    ) : null
}
       

        <input
          type="file"
          onChange={handleClickFile}
          ref={selectModelFileRef}
          style={{ display: "none" }}
        />
      </Stack>

      {/* save button */}
      <UniversalButton
        label={"Save"}
        width={"fit-content"}
        fontSize={"medium"}
        textColor="common.white"
        sx={{
          m: '1rem 0 0',
          alignSelf: "flex-end",
          fontWeight: "500",
          backgroundColor: "success.dark",
          border: "none",
          borderRadius: ".5em",
          padding: "0.75rem 1rem",
          lineHeight: "1",
          "&:hover": {
            backgroundColor: "success.dark",
          },
        }}
      />
    </Stack>
  );
};

export default ModelsSettingAdmin;
