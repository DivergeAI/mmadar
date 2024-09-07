import { Box, Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../../components/common/Text';
import CustomSwitch from '../../../components/common/CustomSwitch';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import { Add, Check, KeyboardArrowDown, Lock, LockOpen, Remove } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';
import { useFormik } from 'formik';

type UserSettingAdminProps = {
    isAllowChatDeletion: boolean,
    isModelWhitelist: boolean,
    whiteListedModels: string[],
    defaultModel: string,
}

const initialValues:UserSettingAdminProps= {
    isModelWhitelist: false,
    whiteListedModels: [''],
    defaultModel: '',
    isAllowChatDeletion: false,
}

const UserSettingAdmin = () => {
    const theme = useTheme();

    const {handleChange,values, handleSubmit, setFieldValue} = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log('submitted', values);
        }
    });

   

    const handleAddToWhiteList = () => {
        if (values.whiteListedModels.length > 0 && values.whiteListedModels[values.whiteListedModels.length - 1] === '') return;
        setFieldValue('whiteListedModels',[...values.whiteListedModels, '']);
    };
    const handleRemoveFromWhiteList = (index: number) => {
        const updatedValues = values.whiteListedModels.filter((_, i) => i !== index);
        setFieldValue('whiteListedModels', updatedValues);
    }
    const handleModelToWhiteListChange = (event: any, index: number) => {
        const value = event.target.value as string;
        const updatedModels = values.whiteListedModels.map((model, i) => i === index ? value : model);
        setFieldValue('whiteListedModels', updatedModels);
    };
    
    return (
        <Stack height={'100%'} component={'form'}
            onSubmit={handleSubmit}>
            <Stack gap={1} height={'100%'} flex={"1 1 auto"}
                sx={{
                    overflowY: 'auto'
                }}>                <Text fontSize='.87rem' fontWeight='500'>
                    User Permissions
                </Text>

                {/* allow chat deletion */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Allow Chat Deletion
                    </Text>
                    <UniversalButton
                        onClick={() => setFieldValue('isAllowChatDeletion',!values.isAllowChatDeletion)}
                        variant='text'
                        backgroundColor='transparent'
                        border='none'
                        textColor='common.black'
                        fontSize={'.75rem'}
                        startIcon={<Icon fontSize='small' >
                            {values.isAllowChatDeletion ? <LockOpen sx={{
                                width: '1rem',
                                height: '1rem',
                            }} /> : <Lock sx={{
                                width: '1rem',
                                height: '1rem',
                            }} />}
                        </Icon>}
                        label={values.isAllowChatDeletion ? 'Allow' : 'Don\'t Allow'}
                        sx={{
                            padding: '0',
                            lineHeight: '0',
                            fontWeight: '500',
                        }}
                    />
                </Stack>

                <Divider />

                {/* manage model */}
                <Text fontSize='.87rem' fontWeight='500'>
                    Manage Models
                </Text>

                {/* default Model */}
                <TextFieldContainer label='Default Model' >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='defaultModel'
                        value={values.defaultModel}
                        onChange={handleChange}
                        size='small'
                        variant='outlined'
                        IconComponent={KeyboardArrowDown}
                        renderValue={(value) => value || 'Select a model'}  // Custom renderValue to only show the label
                        displayEmpty
                        MenuProps={{
                            PaperProps: {
                                sx: {

                                    // width: "fit-content",
                                    fontSize: ".875rem",
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    backgroundColor: 'grey.400',
                                    boxShadow: "none",
                                    height: "fit-content",
                                    padding: "0",
                                    '& .MuiList-root': {
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
                                // padding :'0 .5rem',
                                width: "100%",
                                textTransform: "none",
                                fontSize: ".875rem",
                                backgroundColor: "grey.300",
                                border: 'none',
                                borderRadius: ".5rem",
                                whiteSpace: "nowrap",
                                '&:hover': {

                                }
                            },
                            '& fieldSet': {
                                border: 'none !important',
                            },
                        }}
                    >
                        <MenuItem value="" disabled
                            sx={{

                                textTransform: "none",
                                fontSize: ".875rem",
                                whiteSpace: "nowrap",
                                padding: ".3rem 1rem",

                            }}>
                            <ListItemIcon sx={{ visibility: values.defaultModel === '' ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                                <Check fontSize="small" />
                            </ListItemIcon> Select a model</MenuItem>
                        {['mixtral:latest'].map((option) => (
                            <MenuItem key={option} value={option}
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
                                <ListItemIcon sx={{ visibility: values.defaultModel === option ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                                    <Check fontSize="small" />
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}


                    </Select>

                </TextFieldContainer>
                <Divider />

                {/* model Whitlisting */}

                < Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='small' fontWeight='500'>
                        Model Whitelisting
                    </Text>
                    <CustomSwitch name='isModelWhitelist' value={values.isModelWhitelist} onChange={handleChange}/>
                </Stack>


                {values.isModelWhitelist &&
                    values.whiteListedModels.map((model, index) => (
                        <>
                            <Stack direction={'row'} gap={1}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    value={model}
                                    onChange={(event) => handleModelToWhiteListChange(event, index)}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {

                                                // width: "fit-content",
                                                fontSize: ".875rem",
                                                border: `1px solid ${theme.palette.grey[500]}`,
                                                backgroundColor: 'grey.400',
                                                boxShadow: "none",
                                                height: "fit-content",
                                                padding: "0",
                                                '& .MuiList-root': {
                                                    padding: ".2rem",
                                                }
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
                                    size='small'
                                    variant='outlined'
                                    IconComponent={KeyboardArrowDown}
                                    renderValue={(value) => value || 'Select a model'}  // Custom renderValue to only show the label
                                    displayEmpty
                                    sx={{
                                        "& .MuiSelect-select": {
                                            // padding :'0 .5rem',
                                            width: "100%",
                                            textTransform: "none",
                                            fontSize: ".875rem",
                                            backgroundColor: "grey.300",
                                            border: 'none',
                                            borderRadius: ".5rem",
                                            whiteSpace: "nowrap",
                                            '&:hover': {

                                            }
                                        },
                                        '& fieldSet': {
                                            border: 'none !important',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled
                                        sx={{
                                            // backgroundColor: 'grey.400',
                                            textTransform: "none",
                                            fontSize: ".875rem",
                                            whiteSpace: "nowrap",
                                            padding: ".3rem 1rem",

                                        }}>
                                        <ListItemIcon sx={{ visibility: model === '' ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
                                            <Check fontSize="small" />
                                        </ListItemIcon> Select a model</MenuItem>
                                    {['mixtral:latest', 'list'].map((option) => (
                                        <MenuItem key={option} value={option}
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
                                            <ListItemIcon sx={{ visibility: model === option ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
                                                <Check fontSize="small" />
                                            </ListItemIcon>
                                            {option}
                                        </MenuItem>
                                    ))}


                                </Select>
                                <IconButton
                                    onClick={index === 0 ? handleAddToWhiteList : () => handleRemoveFromWhiteList(index)}
                                    sx={{
                                        padding: '.5rem',
                                        backgroundColor: 'grey.300',
                                    }} >
                                    <Icon fontSize='small'>
                                        {index === 0 ? <Add /> : <Remove />}
                                    </Icon>
                                </IconButton>
                            </Stack>

                        </>

                    ))}
                {values.isModelWhitelist && <Text fontSize='.75rem' fontWeight='500' sx={{
                    textAlign: 'right',
                }}>
                    {values.whiteListedModels?.length} Model(s) Whitelisted

                </Text>}
            </Stack>

            {/* submit button */}
            <UniversalButton
                type='submit'
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    alignSelf: 'flex-end',
                    m: '1rem 0 0',
                    fontWeight: "500",
                    backgroundColor: "success.dark",
                    border: "none",
                    borderRadius: ".5em",
                    padding: "0.75rem 1rem",
                    lineHeight: "1",
                    "&:hover": {
                        backgroundColor: 'success.dark',
                    },
                }}
            />        </Stack>

    );
};

export default UserSettingAdmin;