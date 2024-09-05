import {
  Divider,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import UniversalButton from "../../../components/common/UniversalButton";
import { Check, KeyboardArrowDown } from "@mui/icons-material";
import Text from "../../../components/common/Text";
import CustomSwitch from "../../../components/common/CustomSwitch";
import TextFieldContainer from "../../../components/common/TextFieldContainer";

const WebSearchSetting = () => {
  const theme = useTheme();
  const [webSearchEnabled, setWebSearchEnabled] = React.useState(false);
  return (
    <Stack height={"100%"} component={"form"}>
      <Stack gap={1} flex={"1 1 auto"}>
        <Text fontSize=".87rem" fontWeight="500">
          Web Search
        </Text>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
            Enable Web Search
          </Text>
          <CustomSwitch value={webSearchEnabled} onChange={() => setWebSearchEnabled(!webSearchEnabled)} />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
            Web Search Engine
          </Text>
          <Select
            defaultValue={"pending"}
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
            {["pending", "admin", "user"].map((option) => (
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
                    visibility: "pending" === option ? "visible" : "hidden",
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
{webSearchEnabled ? 
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}
        >
            <TextFieldContainer label="Search Result Count" >
            <TextField
                value={'3'}
                variant="outlined" 
                fullWidth
                size="small"
                sx={{
                    '& .MuiInputBase-root': {
                        fontSize :'.87rem',
                        backgroundColor : 'grey.200'  ,
                        borderRadius : '.5rem',
                        '& fieldSet':{
                            border : 'none'
                        }  
                    }
                }}
                />
            </TextFieldContainer>
            <TextFieldContainer label="Concurrent Requests" >
            <TextField
                value={'10'}
                variant="outlined" 
                fullWidth
                size="small"
                sx={{
                    '& .MuiInputBase-root': {
                        fontSize :'.87rem',
                        backgroundColor : 'grey.200'  ,
                        borderRadius : '.5rem',
                        '& fieldSet':{
                            border : 'none'
                        }  
                    }
                }}
                />
            </TextFieldContainer>
            </Stack> : null}
        <Divider />
        <Text fontSize=".87rem" fontWeight="500">
        Web Loader Settings
        </Text>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500">
          Bypass SSL verification for Websites
</Text>
          <UniversalButton
            label="On"
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
            />
        </Stack>

        <Text fontSize=".75rem" fontWeight="500">
        Youtube Loader Settings
        </Text>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          >
            <Text fontSize=".75rem" fontWeight="500" sx={{
                minWidth: "fit-content !important",
            }}>
                Language
                </Text>
                <TextField
                value={'en'}
                variant="outlined" 
                fullWidth
                size="small"
                sx={{
                    '& .MuiInputBase-root': {
                        fontSize :'.87rem',
                        backgroundColor : 'grey.200'  ,
                        borderRadius : '.5rem',
                        '& fieldSet':{
                            border : 'none'
                        }  
                    }
                }}
                />
          </Stack>
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

export default WebSearchSetting;
