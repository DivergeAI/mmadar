import React, { Fragment } from 'react';
import UniversalButton from '../../../components/common/UniversalButton';
import { Box, Divider, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import Text from '../../../components/common/Text';
import CustomSwitch from '../../../components/common/CustomSwitch';
import { Add, Cached, Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';


const initialValues ={
    enableOpenAIAPI: false,
    enableOllamaAPI: false,
    openAIAPIBaseURL: 'https://api.openai.com/v1',
    openAIAPIKey: '',
    ollamaAPIURL: 'http://ollama:11434',
}

const ConnectionsSettingAdmin = () => {
    const [isAPIKeyVisible, setIsAPIKeyVisible] = React.useState(false);
    const [isOpenAIKeyVisible, setIsOpenAIKeyVisible] = React.useState(false);
    const [isOllamaKeyVisible, setIsOllamaKeyVisible] = React.useState(false);

    const {values, handleChange, handleSubmit} =useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <Stack height={'100%'} component={'form'}
        >
            <Stack gap={1} height={'100%'} flex={"1 1 auto"}
                sx={{
                    overflowY: 'auto'
                }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.87rem' fontWeight='500' >
                        OpenAI API
                    </Text>
                    <CustomSwitch name='enableOpenAIAPI' value={values.enableOpenAIAPI} onChange={handleChange} />
                </Stack>

                {/* OpenAI API */}
                {values.enableOpenAIAPI ? (
                    <Box my={0.5}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1} >
                            <TextField
                                    name='openAIAPIBaseURL'
                                value={values.openAIAPIBaseURL}
                                onChange={handleChange}
                                placeholder='API Base URL'
                                variant='outlined'
                                fullWidth

                                sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '.875rem',
                                        lineHeight: '1.5',
                                        borderRadius: '.5em',
                                        backgroundColor: 'grey.200',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                }} />

                            <TextField
                                value={''}
                                placeholder='API Key'
                                variant='outlined'
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={() => setIsAPIKeyVisible(!isAPIKeyVisible)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                    }
                                                }}>
                                                <Icon fontSize='small'>
                                                    {isAPIKeyVisible ? <VisibilityOff sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} /> :
                                                        <Visibility sx={{
                                                            width: '1rem',
                                                            height: '1rem',
                                                        }} />
                                                    }
                                                </Icon>
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '.75rem',
                                        borderRadius: '.5em',
                                        backgroundColor: 'grey.200',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                }} />

                            <Icon fontSize='small'>
                                <Add />
                            </Icon>

                            <Tooltip title='Verify Connection'
                                placement='top'>
                                <IconButton sx={{
                                    padding: '.5rem',
                                    backgroundColor: 'grey.400',
                                    '&:hover': {
                                        backgroundColor: 'grey.300',
                                    }
                                }}>
                                    <Icon fontSize='small'>
                                        <Cached />
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Text fontSize='.75rem' color='grey.500' sx={{
                            mt: '.3rem'
                        }}>
                            WebUI will make requests to
                            'https://api.openai.com/v1/models'

                        </Text>
                    </Box>
                ) : null}




                <Divider />

                < Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.87rem' fontWeight='500' >
                        Ollama API</Text>
                    <CustomSwitch name='enableOllamaAPI' value={values.enableOllamaAPI} onChange={handleChange} />
                </Stack>
                {/* Ollama API */}
                {values.enableOllamaAPI ? (
                    <Box my={0.5}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                            <TextField
                               value={values.ollamaAPIURL}
                                 name='ollamaAPIURL'
                                onChange={handleChange}
                                placeholder='Enter URL (e.g. http://ollama:11434)'
                                variant='outlined'
                                fullWidth

                                sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '.875rem',
                                        lineHeight: '1.5',
                                        borderRadius: '.5em',
                                        backgroundColor: 'grey.200',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                    },
                                }} />

                            <Icon fontSize='small'>
                                <Add />
                            </Icon>

                            <Tooltip title='Verify Connection'
                                placement='top'>
                                <IconButton sx={{
                                    padding: '.5rem',
                                    backgroundColor: 'grey.400',
                                    '&:hover': {
                                        backgroundColor: 'grey.300',
                                    }
                                }}>
                                    <Icon fontSize='small'>
                                        <Cached />
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Text fontSize='.75rem' color='grey.500' sx={{
                            mt: '.3rem'
                        }}>
                            Trouble accessing Ollama? < NavLink to='#'
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'underline',
                                }}>
                                Click here for help.
                            </NavLink>
                        </Text>
                    </Box>
                ) : null}
            </Stack>

            {/* Form Submit button */}
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

export default ConnectionsSettingAdmin;