import {
  Add,
  AdminPanelSettings,
  ArchiveOutlined,
  Check,
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
  useTheme,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import SelectMenu from "../../components/common/SelectMenu";
import Text from "../../components/common/Text";
import ArchivedChatDialog from "./ArchivedChatDialog";
import UniversalButton from "../../components/common/UniversalButton";
import image from '../../assets/logo192.png';
import { NavLink } from "react-router-dom";
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

const containsText = (text: string, searchText: string) =>{
  if (searchText === '') {
    return true;
  }
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
}

const allOptions = ["maxtrial:latest"];

const HeaderSection = ({models}:any) => {
  const theme = useTheme();
  const [isArchivedChats, setIsArchivedChats] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [createModels, setCreateModels] = useState<string[]>([""]);
console.log("AllModelList",models)
  const handleAddModels = () => {
    setCreateModels([...createModels, ""]);
  };

  const handleRemoveModel = (index: number) => {
    setCreateModels(createModels.filter((_, i) => i !== index));
  };

  const displayedOptions = useMemo(
    () => models?.filter((option) => containsText(option?.name, searchText)),
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
value={selectedOption}
onChange={(e) => setSelectedOption(e.target.value)}  // Ensure this is working
onClose={() => setSearchText("")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        width: "30rem",
                        border: `1px solid ${theme.palette.grey[300]}`,
                        boxShadow: "none",
                        height: "fit-content",
                        padding: "0",
                        backgroundColor: "common.white",
                        '& .MuiList-root': {
                          padding: '0 !important',
                        }
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
                  label="Options"
                  
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
                  // disableGutters
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    lineHeight: "0",
                  }}>
                    <TextField
                      size="small"
                      autoFocus
                      placeholder="Search a model"
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
                          padding: ".3rem",
                          backgroundColor: "common.white",
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
                  {displayedOptions?.length === 0 ? (
                    <Box 
                    boxSizing={'border-box'}
                    width={"100%"}
                    >
                      <Text sx={{
                                            margin : ".7rem 1.5rem"

                      }}>
                        No result found
                      </Text>
                      <Box
                      
                      component={NavLink}
                      to={'#'}
                      sx={{
                        display :'block',
                        margin : " 0.7rem 1rem",
                        padding : ".5rem .5rem .75rem",
                        color: theme.palette.grey[800],
                        fontSize: '.875rem',
                        lineHeight: '1.25rem',
                        fontWeight: '500',
                        fontFamily: 'system-ui',
                        textDecoration: 'none',
                        ':hover': {
                          borderRadius: '.5rem',
                          color: theme.palette.grey[800],
                          backgroundColor: "grey.400",
                        }
                      }}
                      >
                       Pull "{searchText}" from the Ollama.com
                      </Box>
                    </Box>
                  ) : (
                    (displayedOptions || models)?.map((option : any, i) => (
                      <MenuItem
                        key={option?.id}
                        value={option.name}
                        sx={{
                          margin: "0.5rem .75rem .375rem",
                          borderRadius: ".5rem",
                          "&:hover": {
                            backgroundColor: "grey.400",
                          },
                          "&.Mui-selected": {
                            fontWeight: "500",
                            fontSize: ".875rem",
                            lineHeight: "1.25rem",
                            backgroundColor: "grey.400",
                            ":hover": {
                              backgroundColor: "transparent",
                            },
                          },
                        }}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          width={"100%"}
                          sx={{
                            fontSize: ".875rem",
                          }}
                        >
                         <Stack direction={'row'} alignItems={'end'}>
  <Avatar
    src={image}
    sx={{
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "8px",
    }}
  />
  <Text fontSize=".875rem" fontWeight="600">
    {option?.name}
  </Text>
  {/* Wrap Tooltip around a Box or native element */}
  <Tooltip title={`${option?.ollama?.details?.quantization_level} (${(option.ollama?.size / 1024 ** 3).toFixed(1)}GB)`} placement="top"
  sx={{
    '& .MuiTooltip-tooltip':{
      fontSize: '.875rem !important',
      fontWeight: '500',
    }
  }}>
      <Text fontSize=".75rem" fontWeight="500" color="grey.900" sx={{ml:'2px'}}>
        {option?.owned_by === 'ollama' ? option?.ollama.details.parameter_size : ''}
      </Text>
  </Tooltip>
</Stack>

                         {selectedOption === option.name && (
                          <Icon sx={{
                            color: theme.palette.grey[800],
                            width: '1rem',
                            height: '1rem',
                          }}>
                            <Check/>
                          </Icon>
                         )}
                        

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
