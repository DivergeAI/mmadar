import React, { Fragment } from 'react';
import Text from '../../../components/common/Text';
import { Divider, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import CustomSwitch from '../../../components/common/CustomSwitch';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import { KeyboardArrowDown } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';

const GeneralSettingsAdmin = () => {
    const theme = useTheme();
    const [checked, setChecked] = React.useState(true);
    return (
        <Stack height={'100%'} component={'form'}>
 <Stack gap={1} flex={'1 1 auto'}>
            <Text fontSize='.87rem' fontWeight='500'>
            General Setting
                </Text>

                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Enable New Sign Ups</Text>
                    <CustomSwitch value= {checked} onChange={()=>setChecked(!checked)}/>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Enable New Sign Ups</Text>
                    <Select

                                        defaultValue={'pending'}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {

                                                    width: "fit-content",
                                                    fontSize: ".75rem",
                                                    border: `1px solid ${theme.palette.grey[300]}`,
                                                    boxShadow: "none",
                                                    // height: "fit-content",
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
                                        sx={{
                                            "& .MuiSelect-select": {
                                                padding :'0 .5rem',
                                                width: "fit-content",
                                                textTransform: "capitalize",
                                                fontSize: ".75rem",
                                                backgroundColor: "common.white",
                                                border: 'none',
                                                borderRadius: ".5rem",
                                                whiteSpace: "nowrap",
                                            },
                                            '& fieldSet': {
                                                border: 'none !important',
                                            },
                                        }}
                                    >
                                        {['pending', 'admin', 'user'].map((option) => (
                                            <MenuItem key={option} value={option}
                                                sx={{
                                                    textTransform: "capitalize",
                                                    fontSize: ".75rem",
                                                    whiteSpace: "nowrap",
                                                    padding: ".3rem 1rem",
                                                    // borderRadius: ".5rem",
                                                    '&:hover': {
                                                        borderRadius: ".5rem",
                                                        backgroundColor: 'grey.300',
                                                    },
                                                    '&.Mui-selected': {
                                                        borderRadius: ".5rem",
                                                        backgroundColor: 'grey.300',
                                                    },
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}


                                    </Select>                </Stack>
                <Divider />
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Show Admin Details in Account Pending Overlay</Text>
                    <CustomSwitch value= {checked} onChange={()=>setChecked(!checked)}/>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Enable Community Sharing
                    </Text>
                    <CustomSwitch value= {checked} onChange={()=>setChecked(!checked)}/>
                </Stack>
                <Divider />

                <TextFieldContainer label='JWT Expiration' >
                    <TextField 
                    value={'-1'}
                    placeholder={`e.g.) "30m", "1h", "1d"`}
sx={{
    '& .MuiInputBase-root': {
        borderRadius :'.5rem',
        backgroundColor: 'grey.200',
        fontSize: '.75rem'},
    '& fieldset': {
        border :'none'
    }
}}
                    />
                    <Text fontSize='small' fontWeight='500' color='grey.500' sx={{
                        mt: '.4rem'
                    }}>
                    Valid time units: 's', 'm', 'h', 'd', 'w' or '-1' for no expiration.
                    </Text>
                </TextFieldContainer>
                <Divider />

                <TextFieldContainer label='Webhook URL' >
                    <TextField 
                    placeholder={'https://example.com/webhook'}
sx={{
    '& .MuiInputBase-root': {
        borderRadius :'.5rem',
        backgroundColor: 'grey.200',
        fontSize: '.75rem'},
    '& fieldset': {
        border :'none'
    }
}}
                    />
                    
                </TextFieldContainer>
        </Stack>
        <UniversalButton
                        label={"Save"}
                        width={"fit-content"}
                        fontSize={"medium"}
                        textColor="common.white"
                        sx={{
                            // m: ' 0 1rem',
                            alignSelf: 'flex-end',
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
                    />
        </Stack>
       
    );
};

export default GeneralSettingsAdmin;