import  { useState } from 'react';
import Text from '../common/Text';
import { Divider, ListItemIcon, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import { Check, KeyboardArrowDown } from '@mui/icons-material';
import { themeOptions } from '../../utils/constants';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import UniversalButton from '../common/UniversalButton';
import AdvancePrompt, { renderPromptChildren } from '../Workspace/AdvancePrompt';
import { AdvanceModel } from '../../types/createModel';

const initialValues = {
    theme: themeOptions[0],
    language: 'English US',
    notification :false,
    systemPrompt :'',
    requestedMode : 'false'
}
type PromptConfig = {
    label: string;
    keyName: string;
    type: 'text' | 'slider' | 'switch'; // define types of input controls
    sliderProps?: any; // any additional props for sliders
    textProps?: any;   // any additional props for text fields
    switchProps?: any; // any additional props for switches
  };
  

const GeneralSetting = () => {
    const theme = useTheme()
    const [isAdvancePrompt, setIsAdvancePrompt] = useState(false);
    const [advancedPromptValues, setAdvancedPromptValues] = useState<AdvanceModel>(
        {
          seed: 0,
          stopSequence: "",
          temperature: 0,
          mirostat: 0,
          mirostatEta: 0,
          mirostatTau: 0,
          topK: 0,
          topP: 0,
          minP: 0,
          frequencyPenalty: 0,
          repeatLastN: 0,
          tfsZ: 0,
          contextLength: 0,
          batchSize: 0,
          tokenToKeep: 0,
          maxTokens: 0,
          useMmap: false,
          useMlock: false,
          useThread: 0,
          customStates: {
            seed: false,
            stopSequence: false,
            temperature: false,
            mirostat: false,
            mirostatEta: false,
            mirostatTau: false,
            topK: false,
            topP: false,
            minP: false,
            frequencyPenalty: false,
            repeatLastN: false,
            tfsZ: false,
            contextLength: false,
            batchSize: false,
            tokenToKeep: false,
            maxTokens: false,
            useMmap: false,
            useMlock: false,
            useThread: false,
          },
        }
      );

      const [isKeepAlive, setIsKeepAlive] = useState(false);


    const { handleChange, values ,setFieldValue} = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    const handleAdvancedPromptChange = (
        key: number | string,
        value: any,
        isCustom?: boolean
      ) => {
        setAdvancedPromptValues((prev) => ({
          ...prev,
          [key]: value,
          customStates: {
            ...prev.customStates,
            [key]: isCustom !== undefined ? isCustom : prev.customStates[key],
          },
        }));
      };

    const ADVANCE_PROMPT_VIEW: PromptConfig[] = [
        { label: "Seed", keyName: "seed", type: "text", textProps: { type: "number" } },
        { label: "Stop Sequence", keyName: "stopSequence", type: "text", textProps: { placeholder: "Enter stop sequence" } },
        { label: "Temperature", keyName: "temperature", type: "slider" },
        { label: "Mirostat", keyName: "mirostat", type: "slider" },
        { label: "Mirostat Eta",keyName: "mirostatTau", type: "slider" },
        { label: "Mirostat Tau",keyName: "mirostatEta", type: "slider" },
        { label: "Top K",keyName: "topK", type: "slider" },
        { label: "Top p",keyName: "topP", type: "slider" },
        { label: "Min p",keyName: "minP", type: "slider" },
        { label: "Frequency Penalty", keyName: "frequencyPenalty",type: "slider" },
        { label: "Repeat Last N", keyName: "repeatLastN",type: "slider" },
        { label: "Tfs Z", keyName: "tfsZ",type: "slider" },
        { label: "Context Length", keyName: "contextLength",type: "slider" },
        { label: "Batch Size (num_batch)", keyName: "batchSize",type: "slider" },
        { label: "Token To Keep On Context Refresh (num_keep)", keyName: "tokenToKeep",type: "slider" },
        { label: "Max Tokens (num_predict)", keyName: "maxTokens",type: "slider" },
        { label: "use_mmap (Ollama)", keyName: "useMmap", type: "switch" },
        { label: "use_mlock (Ollama)", keyName: "useMlock", type: "switch" },
        { label: "num_thread (Ollama)", keyName: "numThread", type: "slider" },
      ]  
    return (
        <Stack height={"100%"} component={"form"}>
        <Stack gap={1} height={'100%'} flex={"1 1 auto"}
        sx={{
          overflowY: 'auto'
        }}> 
            <Text
                fontSize='.87rem' fontWeight='500'>WebUI Settings
            </Text>
            {/* THeme */}
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize='.75rem' fontWeight='500'>Theme</Text>
                <Select
                    name='theme'
                    value={values.theme}
                    onChange={handleChange}
                    defaultValue={'light'}
                    variant='outlined'
                    size='small'
                    IconComponent={KeyboardArrowDown}
                    renderValue={(value) => value}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                width: "fit-content",
                                fontSize: ".75rem !important",
                                lineHeight: '1rem',
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
                            horizontal: "right",
                        },
                        transformOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }}
                    sx={{
                        "& .MuiSelect-select": {
                            width: 'fit-content',
                            fontSize: ".75rem !important",
                            //   lineHeight :'1 !important',
                            padding: '0.3rem',
                            backgroundColor: "transparent",
                            border: "none",
                            borderRadius: ".5rem",
                            whiteSpace: "nowrap",
                        },
                        "& fieldSet": {
                            border: "none !important",
                        },
                    }}
                >
                    {themeOptions?.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                fontSize: ".75rem",
                                whiteSpace: "nowrap",
                                padding: ".1rem 1rem",
                                "&:hover": {
                                    borderRadius: ".2rem",
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
                                    visibility: values.theme === option ? 'visible' : 'hidden',
                                    minWidth: "fit-content !important",
                                    width: "14px",
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

            {/* language */}
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                {/* User Role */}
                <Text fontSize=".75rem" fontWeight="500">
                    Default User Role
                </Text>
                <Select
                    name="language"
                    value={values.language}
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
                            backgroundColor: "transparent",
                            border: "none",
                            borderRadius: ".5rem",
                            whiteSpace: "nowrap",
                        },
                        "& fieldSet": {
                            border: "none !important",
                        },
                    }}
                >
                    {["English US", "English UK", "Spanish"].map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                textTransform: "capitalize",
                                fontSize: ".75rem",
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
                                    visibility:values.language === option ? "visible" : "hidden",
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
                </Select>{" "}
            </Stack>
            {/* text */}
            <Text color='grey.500' fontSize='.75rem'>
            Couldn't find your language? 
            <NavLink to='#' 
            style={{
                color : theme.palette.grey[500],
                fontWeight :'600 !important',
                textDecoration : 'underline',
                marginLeft:'2px',
            }}>
            Help us translate Open WebUI!
                </NavLink>
            </Text>
            {/* notification */}

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize=".75rem" fontWeight="500">
            Notifications
             </Text>
             <UniversalButton 
             backgroundColor='transparent'
             textColor='grey.900'
             border = 'none'
             sx={{
                fontSize :'.75rem',
                fontWeight : '400',
                padding : '0',
                '&:hover':{
                    backgroundColor : 'transparent'
                }
             }}
             label ={values.notification ? 'On' : 'Off'}
             disableRipple
             />
            </Stack>
            <Divider />

{/* System Prompt */}
            <Text fontWeight='500' fontSize='.875rem'>
System Prompt           
            </Text>
            <TextField 
            name ='systemPrompt'
            value={values.systemPrompt}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{
                '& .MuiInputBase-root':{
                    borderRadius :'.5rem',
                    fontSize :'.875rem',
                    lineHeight :'1.25rem',
                    backgroundColor :'common.white',
                    '& fieldset':{
                        border :'none'
                    }
                }
            }}            
            />

            {/* Advance  Parameters */}

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontWeight='500' fontSize='.875rem'>
            Advanced Parameters
            </Text>
            <UniversalButton 
            label={isAdvancePrompt ? "Hide" : "Show"}
            onClick={() => setIsAdvancePrompt(!isAdvancePrompt)}
             backgroundColor='transparent'
             textColor='grey.700'
             border = 'none'
             sx={{
                fontSize :'.75rem',
                fontWeight : '400',
                padding : '0',
                '&:hover':{
                    backgroundColor : 'transparent'
                }
             }}
             disableRipple
             />
            </Stack>

            {isAdvancePrompt && (
          <Stack direction={"column"} gap={1.2}>
         
                  {ADVANCE_PROMPT_VIEW.map(({ label, keyName, type, ...props }) => (
        <AdvancePrompt
          key={keyName}
          label={label}
          keyName={keyName}
          value={advancedPromptValues[keyName]}
          isCustom={advancedPromptValues.customStates[keyName]}
          onChange={handleAdvancedPromptChange}
        >
          {renderPromptChildren(type, advancedPromptValues[keyName], keyName, handleAdvancedPromptChange, props)}
        </AdvancePrompt>
      ))}

      <Divider sx={{my :1}}/>

      <Stack direction={"row"} justifyContent={"space-between"} gap={1} alignItems='center'>
        <Text fontSize='.75rem' fontWeight='500'> 
            Keep Alive
        </Text>

        <UniversalButton 
            label={isKeepAlive ? "Custom" : "Default"}
            onClick={() => setIsKeepAlive(!isKeepAlive)}
             backgroundColor='transparent'
             textColor='grey.700'
             border = 'none'
             sx={{
                minWidth :'auto',
                fontSize :'.75rem',
                fontWeight : '400',
                padding : '0',
                '&:hover':{
                    backgroundColor : 'transparent'
                }
             }}
             disableRipple
             />

      </Stack>
{isKeepAlive && (
    <TextField
    value={'5m'}
    type={'text'}
    variant="outlined"
    placeholder={"e.g. '30s', '5m', '1h' .Valid time units are 's', 'm', 'h'"}
    size="small"
    fullWidth
    sx={{
     
      '& .MuiInputBase-root': {
          borderRadius:'0.5rem',
          backgroundColor :'common.white',
          padding: '0 !important',
          fontSize: '.75rem',
      },
      "& fieldset": {
        border: "none !important",
       
      },
    }}
  />
)}

<Stack direction={"row"} justifyContent={"space-between"} gap={1} my={1} alignItems={'center'}>
        <Text fontSize='.875rem' fontWeight='600'> 
        Request Mode

</Text>
<UniversalButton 
            label={values.requestedMode ? "JSON" : "Default"}
            onClick={() => setFieldValue('requestedMode', !values.requestedMode )}
             backgroundColor='transparent'
             textColor='grey.700'
             border = 'none'
             sx={{
                minWidth :'auto',
                fontSize :'.75rem',
                fontWeight : '500',
                padding : '0',
                '&:hover':{
                    backgroundColor : 'transparent'
                }
             }}
             disableRipple
             />
             </Stack>

          </Stack>
        )}
        </Stack>

        {/* Form Submit button */}
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

export default GeneralSetting;