import {
  Add,
  AdminPanelSettings,
  ArchiveOutlined,
  Close,
  Code,
  Download,
  KeyboardArrowDown,
  LogoutRounded,
  MoreHoriz,
  Remove,
  Search,
  SettingsOutlined,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import SelectMenu from "../../components/common/SelectMenu";
import Text from "../../components/common/Text";
import ArchivedChatDialog from "./ArchivedChatDialog";
import UniversalButton from "../../components/common/UniversalButton";

const shareOptions = [
  {
    name: "Share",
    icon: <Share />,
    onClick: () => console.log("Share clicked"),
  },
  {
    name: "Download",
    icon: <Download />,
    onClick: () => console.log("Download clicked"),
  },
];

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = ["maxtrial:latest"];

const HeaderSection = () => {
  const [isArchivedChats, setIsArchivedChats] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [createModels, setCreateModels] = useState<string[]>([""]);

  const handleAddModels = () => {
    setCreateModels([...createModels, ""]);
  };

  const handleRemoveModel = (index: number) => {
    setCreateModels(createModels.filter((_, i) => i !== index));
  };

  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

  const controls = [
    {
      name: "Settings",
      icon: <SettingsOutlined />,
      onClick: () => console.log("Settings clicked"),
    },
    {
      name: "Archived Chats",
      icon: <ArchiveOutlined />,
      onClick: () => setIsArchivedChats(true),
    },
    {
      name: "Playground",
      icon: <Code />,
      onClick: () => console.log("Settings clicked"),
    },
    {
      name: "Admin Panel",
      icon: <AdminPanelSettings />,
      onClick: () => console.log("More clicked"),
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
    <Fragment>
      <Box display={"flex"} alignItems={"start"} justifyContent={"space-between"}>
        <Box >
          {createModels?.map((model, index) => (
            <Stack direction={'row'} gap={0} alignItems={'center'} key={index}>
              <FormControl fullWidth>
                <Select
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        width: "30rem",
                        border: `1px solid #E0E0E0`,
                        boxShadow: "none",
                        height: "fit-content",
                        padding: "0",
                      },
                    },
                    autoFocus: false,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                  }}
                  labelId="search-select-label"
                  id="search-select"
                  value={selectedOption}
                  label="Options"
                  onChange={(e) => setSelectedOption(e.target.value)}
                  onClose={() => setSearchText("")}
                  renderValue={(value) => (
                    <Text fontSize="1.125rem" fontWeight="600">
                      {value || "Select a Model"}
                    </Text>
                  )}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  slotProps={{
                    input: { "aria-label": "Search" },
                  }}
                  sx={{
                    minWidth: "200px",
                    "& .MuiPaper-root": {
                      width: "24rem",
                    },
                    "& .MuiSelect-select": {
                      padding: "0",
                      whiteSpace: "nowrap",
                    },
                    "& .MuiSelect-icon": {
                      width: "24px",
                      height: "24px",
                    },
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiList-root-MuiMenu-list": {
                      padding: "0 !important",
                    }
                  }}
                >
                  <ListSubheader 
                  sx={{
                    '& .MuiListSubheader-root': {
                      lineHeight: '0 !important',
                    }
                  }}>
                    <TextField
                      size="small"
                      autoFocus
                      placeholder="Type to search..."
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon fontSize="small">
                              <Search />
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                      aria-label="Search"
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== "Escape") {
                          e.stopPropagation();
                        }
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "0",
                          // backgroundColor: "common.white",
                          // height: "40px",
                          // paddingRight: "32px",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                    />
                  </ListSubheader>
                  <Divider />
                  {displayedOptions.length === 0 ? (
                    <MenuItem disabled>No options available</MenuItem>
                  ) : (
                    displayedOptions.map((option, i) => (
                      <MenuItem
                        key={i}
                        value={option}
                        sx={{
                          margin: "0.2rem 1rem",
                          borderRadius: ".5rem",
                          "&:hover": {
                            backgroundColor: "grey.400",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "grey.500",
                            ":hover": {
                              backgroundColor: "grey.400",
                            },
                          },
                        }}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"baseline"}
                          sx={{
                            fontSize: ".875rem",
                          }}
                        >
                          <Icon
                            fontSize="small"
                            sx={{
                              marginRight: "8px",
                            }}
                          >
                            <Close />
                          </Icon>
                          <Text fontSize="small" fontWeight="600">
                            {option}
                          </Text>
                        </Stack>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <Tooltip title={index === 0 ? 'Add a model' : 'Remove this model'}
                placement={index === 0 ? 'bottom' : 'top'}
              >
                <IconButton
                  onClick={index === 0 ? handleAddModels : () => handleRemoveModel(index)}

                  sx={{
                    height: 'fit-content',
                  }}
                >
                  <Icon fontSize="small">
                    {index === 0 ? (
                      <Add sx={{ width: '16px' }} />
                    ) : (
                      <Remove sx={{ width: '16px' }} />
                    )}
                  </Icon>
                </IconButton>
              </Tooltip>
            </Stack>
          ))}
          <UniversalButton
            label='Set as Default'
            width='fit-content'
            height='fit-content'
            fontSize='10px'
            textColor='grey.500'
            variant="outlined"
            sx={{
              border: 'none',
              p: '0',
              '&:hover': {
                background: 'none',
              },
            }}
          />
        </Box>

        {/* right Controls */}
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <SelectMenu options={shareOptions} />
          <Tooltip title="Controls">
            <IconButton>
              <Icon>
                <SettingsOutlined />
              </Icon>
            </IconButton>
          </Tooltip>
          <SelectMenu
            options={controls}
            icon={<Avatar sx={{ width: 24, height: 24 }} />}
          />
        </Stack>
      </Box>
      {isArchivedChats && (
        <ArchivedChatDialog
          isOpen={isArchivedChats}
          onClose={() => setIsArchivedChats(false)}
        />
      )}
    </Fragment>
  );
};

export default HeaderSection;
