import React from 'react';
import Text from '../common/Text';
import { Divider, ListItemIcon, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import { Check, KeyboardArrowDown } from '@mui/icons-material';
import { themeOptions } from '../../utils/data';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import UniversalButton from '../common/UniversalButton';

const initialValues = {
    theme: themeOptions[0],
    language: 'English US',
    notification :false,
    systemPrompt :''
}

const GeneralSetting = () => {
    const theme = useTheme()
    const { handleChange, values } = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <Stack gap={1.5}>
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
System Prompt           
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
             label ={'Show'}
             disableRipple
             />
            </Stack>
        </Stack>
    );
};

export default GeneralSetting;