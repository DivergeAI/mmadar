import React, { Fragment } from 'react';
import UniversalButton from '../../../components/common/UniversalButton';
import { Box, Divider, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import Text from '../../../components/common/Text';
import CustomSwitch from '../../../components/common/CustomSwitch';
import { Add, Cached, Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const ConnectionsSettingAdmin = () => {
    const [isAPIKeyVisible, setIsAPIKeyVisible] = React.useState(false);
    const [isOpenAIKeyVisible, setIsOpenAIKeyVisible] = React.useState(false);
    const [isOllamaKeyVisible, setIsOllamaKeyVisible] = React.useState(false);
    return (
        <Stack height={'100%'} component={'form'} 
        >
            <Stack gap={1} flex={'1 1 auto'} >
               
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize='.87rem' fontWeight='500' >
                OpenAI API
                </Text>
                <CustomSwitch value={isAPIKeyVisible} onChange={()=> setIsAPIKeyVisible(!isAPIKeyVisible)}  />
                    </Stack>

                   {/* OpenAI API */}
                   {isAPIKeyVisible ? (
                    <Box  my={0.5}>
                         <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1} >
                        <TextField 
                        value={'https://api.openai.com/v1'}
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
                        }}/>

<TextField 
                        value={''}
                        placeholder='API Key'
                        variant='outlined'
                        fullWidth
                        InputProps={{
                            endAdornment : (
                            <InputAdornment position ='end'>
                                <IconButton 
                                onClick ={()=>setIsAPIKeyVisible(!isAPIKeyVisible)}
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
                                    }}/>
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
                        }}/>

                        <Icon fontSize='small'>
                            <Add/>
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
                                    <Cached/>
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
                    <CustomSwitch value={isOllamaKeyVisible} onChange={()=> setIsOllamaKeyVisible(!isOllamaKeyVisible)} />
                </Stack>
               {/* Ollama API */}
               {isOllamaKeyVisible ? (
                <Box my={0.5}>
                     <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={1}>
                        <TextField 
                        value={'http://ollama:11434'}
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
                        }}/>


                        <Icon fontSize='small'>
                            <Add/>
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
                                    <Cached/>
                                </Icon>
                            </IconButton>
                        </Tooltip>
                        </Stack> 
                        <Text fontSize='.75rem' color='grey.500' sx={{
                            mt: '.3rem'
                        }}>
                        Trouble accessing Ollama? < NavLink to='#'  
                        style={{
                            color :'inherit',
                            textDecoration: 'underline',
                        }}>
                        Click here for help.
                            </NavLink>
                        </Text>
                </Box>
               ): null}


              
               
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

export default ConnectionsSettingAdmin;