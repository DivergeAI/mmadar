import React from "react";
import UniversalButton from "../../../components/common/UniversalButton";
import {
  Divider,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  useTheme,
  Icon,
  Tooltip,
  TextField,
  IconButton,
  Box,
  Grid,
  InputAdornment,
} from "@mui/material";
import Text from "../../../components/common/Text";
import {
  Check,
  KeyboardArrowDown,
  HelpOutline,
  Add,
  Clear,
} from "@mui/icons-material";
import TextFieldContainer from "../../../components/common/TextFieldContainer";
import {
  BANNERS_OPTIONS,
  SEARCH_QUERY_GENERATION_PROMPT,
  TITLE_GENERATION_PROMPT,
} from "../../../utils/constants";
import CustomSwitch from "../../../components/common/CustomSwitch";
import { useFormik } from "formik";

interface Banner {
  content: string;
  type: string;
  dismissible: boolean;
}


let initialValues= {
  localModel : '',
  externalModel : '',
  titleGenerationPrompt: TITLE_GENERATION_PROMPT,
  searchQueryGenerationPrompt: SEARCH_QUERY_GENERATION_PROMPT,
  searchQueryGenerationPromptLengthThreshold: 100,
}

const InterfaceSettingAdmin = () => {
  const theme = useTheme()
  const LOCAL_MODELS = [ "mixtral:latest"];
  const [defaultPromptSuggestions, setDefaultPromptSuggestions] = React.useState<string[]>([""]);
  const [banners, setBanners] = React.useState<Banner[]>([]);

  const {values, handleChange,handleSubmit,setFieldValue} = useFormik({
   initialValues,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const addBanner = () => {
    setBanners([...banners, { content: "", type: "", dismissible: true }]);
  };

  const updateBanner = (index: number, banner: any) => {
    const updatedBanners = [...banners];
    updatedBanners[index] = banner;
    setBanners(updatedBanners);
  }

  const removeBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index))
  }
  return (
    <Stack height={"100%"} component={"form"} gap={1} onSubmit={handleSubmit}>
      <Stack
        gap={1}
        height={"100%"}
        flex={"1 1 auto"}
        sx={{
          overflowY: "auto",
        }}
      >
        <Text fontSize=".87rem" fontWeight="500">
          Set Task Model
          <Tooltip
            title="A task model is used when performing tasks such as generating titles for chats and web search queries"
            placement="top"
          >
            <Icon fontSize="small">
              <HelpOutline
                fontSize="inherit"
                sx={{
                  width: "1rem",
                  height: "1rem",
                }}
              />
            </Icon>
          </Tooltip>
        </Text>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <TextFieldContainer
            label="Local Models"
            sx={{ fontSize: ".75rem !important", fontWeight: "400 !important" }}
          >
            <Select
            name="localModel"
            value={values.localModel}
            onChange={handleChange}
            displayEmpty
              size="small"
              variant="outlined"
              IconComponent={KeyboardArrowDown}
              renderValue={(value: string) => value || 'Current Model'}
              MenuProps={{
                PaperProps: {
                  sx: {
                    width: "fit-content",
                    fontSize: ".875rem",
                    border: `1px solid ${theme.palette.grey[500]}`,
                    backgroundColor: "grey.400",
                    boxShadow: "none",
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
                  border: "none",
                  borderRadius: ".5rem",
                  whiteSpace: "nowrap",
                },
                "& fieldSet": {
                  border: "none !important",
                },
              }}
            >
               <MenuItem
                  value={''}
                  
                  sx={{
                    fontSize: ".875rem",
                    whiteSpace: "nowrap",
                    padding: ".3rem 1rem",
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
                      visibility:
                        values.localModel === '' ? "visible" : "hidden",
                      minWidth: "fit-content !important",
                      width: "1rem",
                      color: "inherit",
                      mr: 0.3,
                    }}
                  >
                    <Check fontSize="small" />
                  </ListItemIcon>
                  Current Model
                </MenuItem>
              {LOCAL_MODELS?.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    fontSize: ".875rem",
                    whiteSpace: "nowrap",
                    padding: ".3rem 1rem",
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
                      visibility:
                        values.localModel === option ? "visible" : "hidden",
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
          </TextFieldContainer>
          <TextFieldContainer
            label="External Models"
            sx={{ fontSize: ".75rem !important", fontWeight: "400 !important" }}
          >
             <Select
            name="externalModel"
            value={values.externalModel}
            onChange={handleChange}
            displayEmpty
              size="small"
              variant="outlined"
              IconComponent={KeyboardArrowDown}
              renderValue={(value: string) => value || 'Current Model'}
              MenuProps={{
                PaperProps: {
                  sx: {
                    width: "fit-content",
                    fontSize: ".875rem",
                    border: `1px solid ${theme.palette.grey[500]}`,
                    backgroundColor: "grey.400",
                    boxShadow: "none",
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
                  border: "none",
                  borderRadius: ".5rem",
                  whiteSpace: "nowrap",
                },
                "& fieldSet": {
                  border: "none !important",
                },
              }}
            >
               <MenuItem
                  value={''}
                  
                  sx={{
                    fontSize: ".875rem",
                    whiteSpace: "nowrap",
                    padding: ".3rem 1rem",
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
                      visibility:
                        values.externalModel === '' ? "visible" : "hidden",
                      minWidth: "fit-content !important",
                      width: "1rem",
                      color: "inherit",
                      mr: 0.3,
                    }}
                  >
                    <Check fontSize="small" />
                  </ListItemIcon>
                  Current Model
                </MenuItem>
              {LOCAL_MODELS?.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    fontSize: ".875rem",
                    whiteSpace: "nowrap",
                    padding: ".3rem 1rem",
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
                      visibility:
                        values.localModel === option ? "visible" : "hidden",
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
          </TextFieldContainer>
        </Stack>

        <Text fontSize=".87rem" fontWeight="500">
          Title Generation Prompt
        </Text>

        <TextField
          name="titleGenerationPrompt"
          value={values.titleGenerationPrompt}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={5}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: ".875rem",
              lineHeight: "1.5",
              backgroundColor: "grey.200",
              borderRadius: ".5rem",
              "& fieldSet": {
                border: "none",
              },
            },
          }}
        />

        <Text fontSize=".87rem" fontWeight="500">
          Search Query Generation Prompt
        </Text>

        <TextField
          name="searchQueryGenerationPrompt"
          value={values.searchQueryGenerationPrompt}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={5}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: ".875rem",
              lineHeight: "1.5",
              backgroundColor: "grey.200",
              borderRadius: ".5rem",
              "& fieldSet": {
                border: "none",
              },
            },
          }}
        />

        <Text fontSize=".87rem" fontWeight="500">
          Search Query Generation Prompt Length Threshold
        </Text>

        <TextField
        name="searchQueryGenerationPromptLengthThreshold"
          value={values.searchQueryGenerationPromptLengthThreshold}
          onChange={handleChange}
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              fontSize: ".875rem",
              lineHeight: "1.5",
              backgroundColor: "grey.200",
              borderRadius: ".5rem",
              "& fieldSet": {
                border: "none",
              },
            },
          }}
        />

        <Divider />
        {/* Banners */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize=".87rem" fontWeight="600">
            Banners
          </Text>
          <IconButton
            onClick={addBanner}
            disableRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Icon fontSize="small">
              <Add />
            </Icon>
          </IconButton>
        </Stack>

        {banners?.map((isBanner, index) => (
          <Stack direction={"row"}>
            <Box
              px={1}
              flex={"1 1 0%"}
              border={`1px solid ${theme.palette.grey[600]}`}
              borderRadius=".75rem"
            >
              <TextField
                placeholder="Content"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={isBanner?.type}
                        onChange={(e) => updateBanner(index, { ...isBanner, type: e.target.value })}
                        size="small"
                        variant="outlined"
                        displayEmpty
                        IconComponent={KeyboardArrowDown}
                        renderValue={(value: string) => value || "Type"}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              width: "fit-content",
                              fontSize: ".75rem",
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
                            padding: "0 .5rem",
                            width: "fit-content",
                            textTransform: "capitalize",
                            fontSize: ".75rem",
                            backgroundColor: "common.white",
                            border: "none",
                            borderRadius: ".5rem",
                            whiteSpace: "nowrap",
                          },
                          "& fieldSet": {
                            border: "none !important",
                          },
                        }}
                      >
                        <MenuItem value="" disabled
                          sx={{
                            // backgroundColor: 'grey.400',
                            textTransform: "none",
                            fontSize: ".75rem",
                            whiteSpace: "nowrap",
                            padding: ".3rem 1rem",

                          }}>
                          <ListItemIcon sx={{ visibility: isBanner.type === "" ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                            <Check fontSize="small" />
                          </ListItemIcon>Type</MenuItem>
                        {BANNERS_OPTIONS?.map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            sx={{
                              textTransform: "capitalize",
                              fontSize: ".75rem",
                              whiteSpace: "nowrap",
                              padding: ".3rem 1rem",
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
                                visibility:
                                  isBanner.type === option
                                    ? "visible"
                                    : "hidden",
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
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Dismissable" placement="top">
                        <Box>
                          <CustomSwitch value={isBanner?.dismissible} onChange={() => updateBanner(index, { ...isBanner, dismissible: !isBanner.dismissible })} />
                        </Box>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    padding: "0",
                    fontSize: ".75rem",
                    borderRadius: ".75rem",
                    backgroundColor: "transparent",
                    "& fieldSet": {
                      border: "none",
                    },
                    "&:placeholder": {
                      fontSize: ".75rem !important",
                      color: theme.palette.grey[600],
                    },
                  },
                }}
              />
            </Box>
            {/* remove Banner Button */}
            <IconButton disableRipple onClick={() => removeBanner(index)}>
              <Icon fontSize="small">
                <Clear />
              </Icon>
            </IconButton>
          </Stack>)
        )}

        {/* Default Prompt Suggestion */}

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize=".87rem" fontWeight="600">
            Default Prompt Suggestions
          </Text>
          <IconButton
            onClick={() => {
              setDefaultPromptSuggestions([...defaultPromptSuggestions, ""]);
            }}
            disableRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Icon fontSize="small">
              <Add />
            </Icon>
          </IconButton>
        </Stack>

        <Grid
          container
          spacing={1}
          columnSpacing={1}

        // border={`1px solid ${theme.palette.grey[600]}`}
        >
          {defaultPromptSuggestions?.map((_, index) => (
            <Grid item xs={12} lg={6}>
              <Stack
                direction={"row"}
                py={0.375}
                borderRadius={".75rem"}
                border={`1px solid ${theme.palette.grey[600]}`}
              >
                <Box width={"100%"}>
                  <Stack direction={"row"}>
                    <TextField
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: "0",
                          fontSize: ".75rem",
                          // lineHeight: '1.5',
                          backgroundColor: "transparent",
                          "& fieldSet": {
                            border: "none",
                          },
                        },
                      }}
                    />
                    <Divider orientation="vertical" flexItem />
                    <TextField
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": {
                          padding: ".1rem .2rem",
                          fontSize: ".75rem",
                          // lineHeight: '1.5',
                          backgroundColor: "transparent",
                          "& fieldSet": {
                            border: "none",
                          },
                        },
                      }}
                    />
                  </Stack>
                  <Divider />
                  <TextField
                    // value={index}
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": {
                        padding: "0",
                        fontSize: ".75rem",
                        // lineHeight: '1.5',
                        backgroundColor: "transparent",
                        "& fieldSet": {
                          border: "none",
                        },
                      },
                    }}
                  />
                </Box>
                <Divider orientation="vertical" flexItem />
                <IconButton
                  onClick={() =>
                    setDefaultPromptSuggestions(
                      defaultPromptSuggestions.filter((_, i) => i !== index)
                    )
                  }
                  sx={{
                    width: "fit-content",
                  }}
                >
                  <Icon fontSize="small">
                    <Clear />
                  </Icon>
                </IconButton>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* bottom Save Button */}
      <UniversalButton
      type='submit'
        label={"Save"}
        width={"fit-content"}
        fontSize={"medium"}
        textColor="common.white"
        sx={{
          m: " 1rem 0 0rem",
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

export default InterfaceSettingAdmin;
