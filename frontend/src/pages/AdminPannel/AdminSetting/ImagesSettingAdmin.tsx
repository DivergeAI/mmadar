import {
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React, { Fragment } from "react";
import { IMAGE_GENERATION_ENGINE } from "../../../utils/constants";
import Text from "../../../components/common/Text";
import {
  Check,
  KeyboardArrowDown,
  Refresh,
  RefreshRounded,
  Visibility,
} from "@mui/icons-material";
import UniversalButton from "../../../components/common/UniversalButton";
import { useFormik } from "formik";

const initialValues={
  imageEngine: IMAGE_GENERATION_ENGINE[0],
  ImageGenerationExperimental : 'On',
   automatic1111BaseURL: '',
  automatic1111ApiAuthString: '',
  comfyUIBaseURL: '',
  openAIAPIBaseURL: 'https://api.openai.com/v1',
  openAIAPIKey: ''
}

const ImagesSettingAdmin = () => {
  const theme = useTheme();
  const [imageEngine, setImageEngine] = React.useState(
    IMAGE_GENERATION_ENGINE[0]
  );

  const {values,handleChange,setFieldValue,handleSubmit} =useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    }
  })

  return (
    <Stack height={"100%"} component={"form"} onSubmit={handleSubmit}>
      <Stack
        gap={1}
        height={"100%"}
        flex={"1 1 auto"}
        sx={{
          overflowY: "auto",
        }}
      >
        {" "}
        <Text fontSize=".87rem" fontWeight="500">
          Image Settings
        </Text>
        {/* Image Generation ENGINE */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize=".75rem"
            fontWeight="500"
            sx={{
              lineHeight: "1",
            }}
          >
            Image Generation Engine
          </Text>
          <Select
name="imageEngine"
            value={values.imageEngine}
            onChange={handleChange}
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
            size="small"
            variant="outlined"
            IconComponent={KeyboardArrowDown}
            renderValue={(value) => value}
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
            {IMAGE_GENERATION_ENGINE?.map((option) => (
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
                    visibility: values.imageEngine === option ? "visible" : "hidden",
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
        </Stack>
        {/* Image generation (experimental) */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
            Image Generation (Experimental)
          </Text>
          <UniversalButton
            label={values?.ImageGenerationExperimental ? 'On' : 'Off'}
            variant="outlined"
            border="none"
            width="fit-content"
            fontSize="12px"
            textColor="common.black"
            backgroundColor="transparent"
            sx={{
              padding: "0 .5rem",
              fontWeight: "500",
              minWidth: "fit-content",
              ml: 1,
              // padding :'0',
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            disableRipple={true} // This prop will be automatically passed
          />
        </Stack>
        <Divider />
        {/* Automatic1111 baseURL */}
        {imageEngine === IMAGE_GENERATION_ENGINE[0] ? (
            // Default (Automatic1111)
          <Fragment>
            <Text fontSize=".875rem" fontWeight="500">
              AUTOMATIC1111 Base URL
            </Text>

            <Stack direction="row" gap={1} alignItems={"center"}>
              <TextField
              name="automatic1111BaseURL"
              value={values.automatic1111BaseURL}
              onChange={handleChange}
                variant="outlined"
                size="small"
                placeholder="Enter URL (e.g. http://127.0.0.1:7860/)"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.875rem",

                    // padding: '.2rem',
                    backgroundColor: "grey.200",
                    borderRadius: ".5rem",
                    "& fieldSet": {
                      border: "none !important",
                    },
                  },
                }}
              />

              <IconButton
                sx={{
                  backgroundColor: "grey.200",
                }}
              >
                <Icon fontSize="small">
                  <RefreshRounded fontSize="inherit" />
                </Icon>
              </IconButton>
            </Stack>

            <Text fontSize=".75rem" fontWeight="400" color="grey.500">
              Include `--api` flag when running stable-diffusion-webui{" "}
              <b>(e.g. `sh webui.sh --api`)</b>
            </Text>

            {/* authomatic1111 API Auth String */}

            <Text fontSize=".875rem" fontWeight="500">
              AUTOMATIC1111 Api Auth String
            </Text>

            <TextField
            name="automatic1111ApiAuthString"
            value={values.automatic1111ApiAuthString}
            onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Enter api auth string (e.g. username:password)"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple>
                      <Icon fontSize="small">
                        <Visibility />
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "0.875rem",

                  // padding: '.2rem',
                  backgroundColor: "grey.200",
                  borderRadius: ".5rem",
                  "& fieldSet": {
                    border: "none !important",
                  },
                },
              }}
            />

            <Text fontSize=".75rem" fontWeight="400" color="grey.500">
              Include `--api-auth` flag when running stable-diffusion-webui{" "}
              <b>(e.g. `sh webui.sh --api --api-auth username:password`)</b>
            </Text>
          </Fragment>

        ) : imageEngine === IMAGE_GENERATION_ENGINE[1] ? (
            // CompfyUI
          <Fragment>
            <Text fontSize=".875rem" fontWeight="500">
              AUTOMATIC1111 Base URL
            </Text>

            <Stack direction="row" gap={1} alignItems={"center"}>
              <TextField
              name="comfyUIBaseURL"
              value={values.comfyUIBaseURL}
              onChange={handleChange}
                variant="outlined"
                size="small"
                placeholder="Enter URL (e.g. http://127.0.0.1:7860/)"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "0.875rem",

                    // padding: '.2rem',
                    backgroundColor: "grey.200",
                    borderRadius: ".5rem",
                    "& fieldSet": {
                      border: "none !important",
                    },
                  },
                }}
              />

              <IconButton
                sx={{
                  backgroundColor: "grey.200",
                }}
              >
                <Icon fontSize="small">
                  <RefreshRounded fontSize="inherit" />
                </Icon>
              </IconButton>
            </Stack>
          </Fragment>
        ) : (
            // OpenAI (DALL-E)
            <Stack direction='row' gap={1}>
            <TextField 
            name="openAIAPIBaseURL"
            value={values.openAIAPIBaseURL} //API Key
            onChange={handleChange}
            placeholder='API Base URL'
            variant='outlined'
            size='small'
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                fontSize:'0.875rem',
                backgroundColor: 'grey.200',
                borderRadius: '.5rem',
                '& fieldSet': {
                  border: 'none !important'
                }
              }
            }}
            />
            <TextField 
            name="openAIAPIKey"
            value={values.openAIAPIKey} //API Key
            onChange={handleChange}
            placeholder='API Key'
            variant='outlined'
            size='small'
            fullWidth
            InputProps={{
              endAdornment : (
                <InputAdornment position='end'>
                  <IconButton 
                  disableRipple
                  >
                    <Icon fontSize='small'>
          
                    <Visibility />
                              </Icon>
                  </IconButton>
                  </InputAdornment>
              )
            }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize:'0.875rem',
                backgroundColor: 'grey.200',
                borderRadius: '.5rem',
                '& fieldSet': {
                  border: 'none !important'
                }
              }
            }}
            />
          </Stack>
        )}
      </Stack>

      {/* bottom Save Button */}
      <UniversalButton
      type='submit'
        label={"Save"}
        width={"fit-content"}
        fontSize={"medium"}
        textColor="common.white"
        sx={{
          m: "1rem 0 0",
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

export default ImagesSettingAdmin;
