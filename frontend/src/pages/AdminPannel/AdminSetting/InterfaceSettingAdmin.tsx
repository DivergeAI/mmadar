import React from 'react';
import UniversalButton from '../../../components/common/UniversalButton';
import { Divider, ListItemIcon, MenuItem, Select, Stack, useTheme } from '@mui/material';
import Text from '../../../components/common/Text';
import { Check, KeyboardArrowDown } from '@mui/icons-material';
import TextFieldContainer from '../../../components/common/TextFieldContainer';

const InterfaceSettingAdmin = () => {
const theme = useTheme();
const SPEACH_TO_TEXT_ENGINE = [
    'Whisper (Local)',
    'OpenAI',
    'Web API'
]
const TEXT_TO_SPEACH_ENGINE = [
    'ElevenLabs',
    'OpenAI',
    'Web API'
]
    return (
        <Stack height={"100%"} component={"form"}>
      <Stack gap={1} flex={"1 1 auto"}>
        <Text fontSize=".87rem" fontWeight="500">
        STT Settings
        </Text>

       
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
          Speech-to-Text Engine
          </Text>
          <Select
            defaultValue={SPEACH_TO_TEXT_ENGINE[0]}
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
                    visibility: SPEACH_TO_TEXT_ENGINE[0] === option ? "visible" : "hidden",
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

        <Divider />
       
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
          TTS Settings
          </Text>
          <Select
            defaultValue={TEXT_TO_SPEACH_ENGINE[0]}
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

<TextFieldContainer label='TTS Voice'>
<Select
            defaultValue={'Default'}
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
                // padding: "0 .5rem",
                textTransform: "capitalize",
                fontSize: ".75rem",
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
          // m: ' 0 1rem',
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