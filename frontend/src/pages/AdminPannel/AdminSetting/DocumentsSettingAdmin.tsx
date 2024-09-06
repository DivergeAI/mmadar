import { Divider, Icon, IconButton, ListItemIcon, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../../components/common/Text';
import { Check, Download, FileCopyOutlined, Folder, KeyboardArrowDown } from '@mui/icons-material';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import UniversalButton from '../../../components/common/UniversalButton';

const DocumentsSettingAdmin = () => {
    const theme = useTheme();
    const [checked, setChecked] = React.useState(true);
    const textAreaDummayData =`Use the following context as your learned knowledge, inside <context></context> XML tags.
<context>
    [context]
</context>

When answer to user:
- If you don't know, just say that you don't know.
- If you don't know when you are not sure, ask for clarification.
Avoid mentioning that you obtained the information from the context.
And answer according to the language of the user's question.

Given the context information, answer the query.
Query: [query]`;

    return (
        <Stack height={'100%'} component={'form'}>
<Stack gap={1} height={'100%'} flex={"1 1 auto"}
      sx={{
        overflowY :'auto'
      }}>                <Text fontSize='.87rem' fontWeight='500'>
                    General Setting
                </Text>

                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Scan for documents from DOCS_DIR (/data/docs)
                    </Text>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Embedding Model Engine
                    </Text>
                    <Select
                        value={'Default (SentenceTransformers)'}                        
                        size='small'
                        variant='outlined'
                        IconComponent={KeyboardArrowDown}
                        renderValue={(value) => value}
                        MenuProps={{
                            PaperProps: {
                                sx: {

                                    width: "fit-content",
                                    fontSize: ".75rem",
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    backgroundColor: 'grey.400',
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
                        sx={{
                            "& .MuiSelect-select": {
                                padding: '0 .5rem',
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
                        {['Default (SentenceTransformers)', 'Ollama', 'OpenAI'].map((option) => (
                            <MenuItem key={option} value={option}
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: ".75rem",
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
                                 <ListItemIcon sx={{ visibility: 'visible', minWidth: 'fit-content', width: '1rem', color: 'inherit' , mr:0.3}}>
                                                <Check fontSize="small" />
                                            </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}


                    </Select>         
               </Stack>
               <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize='.75rem' fontWeight='500'>
              Hybrid Search
              </Text>
              <UniversalButton 
              label = 'On'
              variant='outlined'
              border='none'
              backgroundColor='transparent'
              textColor='grey.700'
              sx={{
                fontSize : '.75rem',
p :'0',
                  '&:hover':{
                    backgroundColor : 'transparent',
                  }
              }}
              />
              </Stack>

                <Divider />
                <Text fontSize='.87rem' fontWeight='500'>
                Embedding Model
                </Text>
                
                <Stack direction={'row'} gap={1} alignItems={'end'} m={0}>
                <TextFieldContainer label='JWT Expiration' >
                    <TextField
                        value={'sentence-transformers/all-MiniLM-L6-v2'}
                        placeholder={`Set embedding model (e.g.)`}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '.5rem',
                                backgroundColor: 'grey.200',
                                fontSize: '.75rem'
                            },
                            '& fieldset': {
                                border: 'none'
                            }
                        }}
                    />
                   
                </TextFieldContainer>
                <IconButton sx={{
                    height  : 'fit-content',    
                                padding: '.5rem .62rem',
                                backgroundColor: 'grey.300',
                                '&:hover': {
                                    backgroundColor: 'grey.400',
                                }
                            }}>
                    <Icon fontSize='small'>
                        <Download/>
                    </Icon>
                </IconButton>
                </Stack>
                <Text fontSize='small' fontWeight='500' color='grey.500' >
Warning: If you update or change your embedding model, you will need to re-import all documents.
                    </Text>

                    {true && (
                         <Stack direction={'row'} gap={1} alignItems={'end'} m={0}>
                         <TextFieldContainer label='Reranking Model' >
                             <TextField
                                 value={''}
                                 placeholder={`Set reranking model (e.g. BAAI/bge-reranker-v2-m3)`}
                                 sx={{
                                     '& .MuiInputBase-root': {
                                         borderRadius: '.5rem',
                                         backgroundColor: 'grey.200',
                                         fontSize: '.75rem'
                                     },
                                     '& fieldset': {
                                         border: 'none'
                                     }
                                 }}
                             />
                            
                         </TextFieldContainer>
                         <IconButton sx={{
                             height  : 'fit-content',    
                                         padding: '.5rem .625rem',
                                         backgroundColor: 'grey.300',
                                         '&:hover': {
                                             backgroundColor: 'grey.400',
                                         }
                                     }}>
                             <Icon fontSize='small'>
                                 <Download/>
                             </Icon>
                         </IconButton>
                         </Stack>
                    )}

                    <Divider />
                    {/* Content Extraction */}

                    <Text fontSize='.87rem' fontWeight='500'>
                    Content Extraction
                </Text>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Engine</Text>
                    <Select
value={'Default'}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {

                                                    width: "fit-content",
                                                    fontSize: ".75rem",
                                                    border: `1px solid ${theme.palette.grey[500]}`,
                                                    backgroundColor: 'grey.400',
                                                    boxShadow: "none",
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
                                        renderValue={(value) => value}
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
                                        {['Default','Tika'].map((option) => (
                                            <MenuItem key={option} value={option}
                                            sx={{
                                                textTransform: "capitalize",
                                                fontSize: ".75rem",
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
                                                <ListItemIcon sx={{ visibility: 'visible', minWidth: 'fit-content', width: '1rem', color: 'inherit' , mr:0.3}}>
                                                <Check fontSize="small" />
                                            </ListItemIcon>
                                                {option}
                                            </MenuItem>
                                        ))}


                                    </Select>                </Stack>
<Divider />

               {/* Query Params */}
               <Text fontSize='.87rem' fontWeight='500'>
               Query Params
               </Text>
                
                    
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                    Top K
                    </Text>

                    <TextField 
                    type='number'
                    variant='outlined'
                    size='small'
                    defaultValue={5}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '.5rem',
                            backgroundColor: 'grey.200',
                            fontSize: '.875rem'
                        },
                        '& fieldset': {
                            border: 'none'
                        }
                    }}
                    />
                </Stack>
                {/* RAG Template */}
                <Text fontSize='.87rem' fontWeight='500'>
                RAG Template
                </Text>
                <TextField 
                value={textAreaDummayData}
                    type='text'
                    variant='outlined'

                    defaultValue={5}
                    multiline
                    rows={4}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '.5rem',
                            backgroundColor: 'grey.200',
                            fontSize: '.875rem',
lineHeight: '1.25',
                        },
                        '& fieldset': {
                            border: 'none'
                        }
                    }}
                    />
                
                <Divider />

                <Text fontSize='.87rem' fontWeight='500'>
                RAG Template
                </Text>                {/* chunks params */}

<Stack direction={{xs : 'column',sm : 'row'}} gap={1}>
<TextFieldContainer label='Chunk Size
' >
                    <TextField
                        value={'1500'}
                        fullWidth
                        placeholder={`Enter Chunk Size`}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '.5rem',
                                backgroundColor: 'grey.200',
                                fontSize: '.75rem'
                            },
                            '& fieldset': {
                                border: 'none'
                            }
                        }}
                    />
                    
                </TextFieldContainer>
                <TextFieldContainer label='Chunk Overlap
' >
                    <TextField
                        value={'100'}
                        fullWidth
                        placeholder={`Enter Chunk Overlap`}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '.5rem',
                                backgroundColor: 'grey.200',
                                fontSize: '.75rem'
                            },
                            '& fieldset': {
                                border: 'none'
                            }
                        }}
                    />
                   
                </TextFieldContainer>
</Stack>

                

              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize='.75rem' fontWeight='500'>
              PDF Extract Images (OCR)
              </Text>
              <UniversalButton 
              label = 'On'
              variant='outlined'
              border='none'
              backgroundColor='transparent'
              textColor='grey.700'
              sx={{
                fontSize : '.75rem',
p :'0',
                  '&:hover':{
                    backgroundColor : 'transparent',
                  }
              }}
              />
              </Stack>
              <Divider />
              <UniversalButton 
label='Reset Upload Directory'
variant='outlined'
width={'100%'}
startIcon ={<FileCopyOutlined />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>

<UniversalButton 
label='Reset Vector Storage'
variant='outlined'
width={'100%'}
startIcon ={<Folder />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>
            </Stack>
            <UniversalButton
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    m: '1rem 0 0 ',
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

export default DocumentsSettingAdmin;