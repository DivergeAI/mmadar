import { Box, Divider, Icon, IconButton, ListItemIcon, Menu, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../../components/common/Text';
import CustomSwitch from '../../../components/common/CustomSwitch';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import { Add, Check, KeyboardArrowDown, Lock, LockOpen, Remove } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';

const UserSettingAdmin = () => {
    const theme = useTheme();
    const [isModelWhitelist, setIsModelWhitelist] = React.useState<boolean>(false);
    const [whiteListedModels, setWhiteListedModels] = React.useState<string[]>(['']);
    const [defaultModel, setDefaultModel] = React.useState<string>('');
    const [isAllowChatDeletion, setIsAllowChatDeletion] = React.useState<boolean>(false);

    const handleDefalutModelChange = (event: any) => {
        setDefaultModel(event.target.value as string);
    };

    const handleAddToWhiteList = () => {
        if(whiteListedModels.length > 0 && whiteListedModels[whiteListedModels.length - 1] === '') return;
        setWhiteListedModels([...whiteListedModels, '']);
    };
    const handleRemoveFromWhiteList = (index: number) => {
        setWhiteListedModels(whiteListedModels.filter((_, i) => i !== index));
    }
    const handleModelToWhiteListChange = (event: any, index: number) => {
        const value = event.target.value as string;
        setWhiteListedModels((prevModels) => prevModels.map((model, i) => i === index ? value : model));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submitted', { defaultModel, isModelWhitelist, whiteListedModels });
    }
    return (
        <Stack height={'100%'} component={'form'} 
        onSubmit={handleSubmit}>
            <Stack gap={1} flex={'1 1 auto'} >
                <Text fontSize='.87rem' fontWeight='500'>
                    User Permissions
                </Text>

                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Allow Chat Deletion
                    </Text>
                    <UniversalButton 
                    onClick={()=>setIsAllowChatDeletion(!isAllowChatDeletion)}
                    variant='text'
                    backgroundColor='transparent'
                    border='none'
                    textColor='common.black'
                    fontSize={'.75rem'}
                     startIcon={<Icon fontSize='small' >
                       {isAllowChatDeletion ? <LockOpen sx={{
                        width: '1rem',
                        height: '1rem',
                       }}/> : <Lock sx={{
                        width: '1rem',
                        height: '1rem',
                       }}/>}
                        </Icon>}
                    label ={isAllowChatDeletion ? 'Allow' : 'Don\'t Allow'}
                    sx={{
                        padding: '0',
                        lineHeight:'0',
                        fontWeight: '500',
                    }}
                    />
                </Stack>
                <Divider />

                <Text fontSize='.87rem' fontWeight='500'>
                    Manage Models
                </Text>

                <TextFieldContainer label='Default Model' >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={defaultModel}
                        onChange={handleDefalutModelChange}
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
                            <ListItemIcon sx={{ visibility: defaultModel === '' ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
                                <Check fontSize="small" />
                            </ListItemIcon> Select a model</MenuItem>
                        {['mixtral:latest'].map((option) => (
                            <MenuItem key={option} value={option}
                                sx={{
                                    textTransform: "none",
                                    fontSize: ".875rem",
                                    whiteSpace: "nowrap",
                                    padding: ".3rem 1rem",
                                    // borderRadius: ".5rem",
                                    '&:hover': {
                                        borderRadius: ".5rem",
                                        color: 'common.white',
                                        backgroundColor: 'primary.light',
                                    },
                                    '&.Mui-selected': {
                                        borderRadius: ".5rem",
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                        }
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ visibility: defaultModel === option ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
                                    <Check fontSize="small" />
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}


                    </Select>

                </TextFieldContainer>
                <Divider />

                < Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='small' fontWeight='500'>
                        Model Whitelisting
                    </Text>
                    <CustomSwitch value={isModelWhitelist} onChange={() => setIsModelWhitelist(!isModelWhitelist)} />
                </Stack>


                {isModelWhitelist &&
                    whiteListedModels.map((model, index) => (
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
                                        <ListItemIcon sx={{ visibility: defaultModel === '' ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
                                            <Check fontSize="small" />
                                        </ListItemIcon> Select a model</MenuItem>
                                    {['mixtral:latest','list'].map((option) => (
                                        <MenuItem key={option} value={option}
                                        sx={{
                                            textTransform: "capitalize",
                                            fontSize: ".875rem",
                                            whiteSpace: "nowrap",
                                            padding: ".3rem 1rem",
                                            // borderRadius: ".5rem",
                                            '&:hover': {
                                                borderRadius: ".5rem",
                                                color: 'common.white',
                                                backgroundColor: 'primary.light',
                                            },
                                            '&.Mui-selected': {
                                                borderRadius: ".5rem",
                                                backgroundColor: 'transparent',
                                                '&:hover': {
                                                    color: 'common.white',
                                                    backgroundColor: 'primary.light',
                                                }
                                            },
                                        }}
                                    >
                                            <ListItemIcon sx={{ visibility: defaultModel === option ? 'visible' : 'hidden', minWidth: 'auto', width: '1rem', color: 'inherit' }}>
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
                {isModelWhitelist && <Text fontSize='.75rem' fontWeight='500' sx={{
                    textAlign: 'right',
                }}>
                    {whiteListedModels?.length} Model(s) Whitelisted

                </Text>}
            </Stack>
            <UniversalButton
            type='submit'
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    alignSelf: 'flex-end',
                    // m: ' 0 1rem',
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