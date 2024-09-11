import UniversalButton from '../../../components/common/UniversalButton';
import { Divider, Icon, IconButton, InputAdornment, ListItemIcon, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import Text from '../../../components/common/Text';
import { Check, KeyboardArrowDown, Visibility } from '@mui/icons-material';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import { SPEACH_TO_TEXT_ENGINE, TEXT_TO_SPEACH_ENGINE } from '../../../utils/constants';
import React from 'react';
import { useFormik } from 'formik';

const initialValues ={
  openAIBaseURL: 'https://api.openai.com/v1',
  openAIKey: '',
  sttEngine: SPEACH_TO_TEXT_ENGINE[0],
  sstModel :'whisper-1',
  ttsEngine: TEXT_TO_SPEACH_ENGINE[0],
  ttsVoice: 'Default'
}

const AudioSettingAdmin = () => {
  const theme = useTheme();
 const [sttEngine ,setSttEngine] = React.useState(SPEACH_TO_TEXT_ENGINE[0])


 const {values,handleChange, setFieldValue, handleSubmit} = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values)
    }
 })

  return (
    <Stack height={"100%"} component={"form"}>
      <Stack gap={1} height={'100%'} flex={"1 1 auto"}
        sx={{
          overflowY: 'auto'
        }}>        
        <Text fontSize=".87rem" fontWeight="500">
          STT Settings
        </Text>

{/* SPEACH TO TEXT ENGINE */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
            Speech-to-Text Engine
          </Text>
          <Select
          name='sttEngine'
          value={values.sttEngine}
          onChange={handleChange}
            size="small"
            variant="outlined"
            IconComponent={KeyboardArrowDown}
            renderValue={(value) => value}
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
            {SPEACH_TO_TEXT_ENGINE?.map((option) => (
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
                    visibility: sttEngine === option ? "visible" : "hidden",
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

{values.sttEngine === 'OpenAI' ? 
(<Stack direction='row' gap={1}>
  <TextField 
  name='openAIBaseURL'
  value={values.openAIBaseURL} //API Base URL
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
  name='openAIKey'
  value={values.openAIKey} //API Key
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
</Stack>)
 : null}


{/* sst Model */}
{values.sttEngine === 'OpenAI'&& 
<>
<Divider />
<Text fontSize=".875rem" fontWeight="500">
 STT Model
 </Text>
 
 <TextField 
 name='sstModel'
  value={values.sstModel}
  onChange={handleChange} //API Base URL
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
  /></>}

        <Divider />
        <Text fontSize=".875rem" fontWeight="500">
            TTS Settings
          </Text>

{/* TTS SETTING */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
           <Text fontSize=".75rem" fontWeight="500">
           Text-to-Speech Engine
           </Text>
       
          <Select
          name='ttsEngine'
          value={values.ttsEngine}
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
            {TEXT_TO_SPEACH_ENGINE?.map((option) => (
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
                    visibility: TEXT_TO_SPEACH_ENGINE[0] === option ? "visible" : "hidden",
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

{/* TTS VOICE */}
        <TextFieldContainer label='TTS Voice'>
          <Select
          name='ttsVoice'
          value={values.ttsVoice}
          onChange={handleChange}
            defaultValue={'Default'}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: "fit-content",
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
            size="small"
            variant="outlined"
            IconComponent={KeyboardArrowDown}
            renderValue={(value) => value}
            sx={{
              "& .MuiSelect-select": {
                // padding: "0 .5rem",
                textTransform: "capitalize",
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
            {['Default']?.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  textTransform: "capitalize",
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
                    visibility: 'Default' === option ? "visible" : "hidden",
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

      {/* bottom Save Button */}
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

export default AudioSettingAdmin;