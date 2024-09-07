import { Divider, Icon, IconButton, ListItemIcon, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../../components/common/Text';
import { Check, Download, FileCopyOutlined, Folder, KeyboardArrowDown } from '@mui/icons-material';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import UniversalButton from '../../../components/common/UniversalButton';
import { useFormik } from 'formik';

const initialValues ={
    embedding_engine: 'Default (SentenceTransformers)',
    embedding_model: 'sentence-transformers/all-MiniLM-L6-v2',
    reranking_model :'',
    scanForDocuments: true,
    hybridSearch: true,
    contentExtractionEngine: 'Default',
    tika_server_url :'http://tika:9998',
    topK: 5,
    minimumScore : 0,
    chunkSize: 1500,
    chunkOverlap: 100,
    pdf_extract_images: true,
    ragTemplate: "Use the following context as your learned knowledge, inside <context></context> XML tags.\n<context>\n    [context]\n</context>\n\nWhen answer to user:\n- If you don't know, just say that you don't know.\n- If you don't know when you are not sure, ask for clarification.\nAvoid mentioning that you obtained the information from the context.\nAnd answer according to the language of the user's question.\n\nGiven the context information, answer the query.\nQuery: [query]",
    
}


const DocumentsSettingAdmin = () => {
    const theme = useTheme();

const {values, handleChange, setFieldValue,handleSubmit} =useFormik({
    initialValues,
    onSubmit :(values)=>{
        console.log(values)
    }
})

 

    return (
        <Stack height={'100%'} component={'form'} onSubmit={handleSubmit}>
            <Stack gap={1} height={'100%'} flex={"1 1 auto"}
                sx={{
                    overflowY: 'auto'
                }}>                <Text fontSize='.87rem' fontWeight='500'>
                    General Setting
                </Text>

                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Scan for documents from DOCS_DIR (/data/docs)
                    </Text>
                    <UniversalButton
                  
                        label={'Scan'}
                        variant='outlined'
                        border='none'
                        backgroundColor='transparent'
                        textColor='grey.700'
                        sx={{
                            fontSize: '.75rem',
                            p: '0',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }}
                    />
                </Stack>
                {/* embedding engine */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Embedding Model Engine
                    </Text>
                    <Select
                        value={values.embedding_engine}
                        onChange={handleChange}
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
                                <ListItemIcon sx={{ visibility: values.embedding_engine === option ? 'visible' : 'hidden', minWidth: 'fit-content !important', width: '1rem', color: 'inherit', mr: 0.3 }}>
                                    <Check fontSize="small" />
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}


                    </Select>
                </Stack>
                {/* hybrid search */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Hybrid Search
                    </Text>
                    <UniversalButton
                    onClick={()=> setFieldValue('hybridSearch', !values.hybridSearch)}
                        label={values.hybridSearch ? 'On' : 'Off'}
                        variant='outlined'
                        border='none'
                        backgroundColor='transparent'
                        textColor='grey.700'
                        sx={{
                            fontSize: '.75rem',
                            p: '0',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }}
                    />
                </Stack>

                <Divider />
                <Text fontSize='.87rem' fontWeight='500'>
                    Embedding Model
                </Text>
{/* embedding model */}
                <Stack direction={'row'} gap={1} alignItems={'end'} m={0}>
                        <TextField
                            value={values.embedding_model}
                            onChange={handleChange}
                            placeholder={`Set embedding model (e.g.)`}
                            fullWidth
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

                    <IconButton sx={{
                        height: 'fit-content',
                        padding: '.5rem .62rem',
                        backgroundColor: 'grey.300',
                        '&:hover': {
                            backgroundColor: 'grey.400',
                        }
                    }}>
                        <Icon fontSize='small'>
                            <Download />
                        </Icon>
                    </IconButton>
                </Stack>
                <Text fontSize='small' fontWeight='500' color='grey.500' >
                    Warning: If you update or change your embedding model, you will need to re-import all documents.
                </Text>
{/* Reranking  */}

                {values.hybridSearch && (
                    <Stack direction={'row'} gap={1} alignItems={'end'} m={0}>
                        <TextFieldContainer label='Reranking Model' >
                            <TextField
                                value={values.reranking_model}
                                onChange={handleChange}
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
                            height: 'fit-content',
                            padding: '.5rem .625rem',
                            backgroundColor: 'grey.300',
                            '&:hover': {
                                backgroundColor: 'grey.400',
                            }
                        }}>
                            <Icon fontSize='small'>
                                <Download />
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
                    name ='contentExtractionEngine'
                        value={values.contentExtractionEngine}
                        onChange={handleChange}
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
                        {['Default', 'Tika'].map((option) => (
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
                                <ListItemIcon sx={{ visibility: values?.contentExtractionEngine === option ?'visible' :'hidden', minWidth: 'fit-content !important', width: '1rem', color: 'inherit', mr: 0.3 }}>
                                    <Check fontSize="small" />
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}


                    </Select>                </Stack>

                    {values.contentExtractionEngine === 'Tika' && (
                        <TextField 
                        name ='tika_server_url'
                        value={values.tika_server_url}
                        onChange={handleChange}
                        placeholder='Enter Tika Server URL'
                        fullWidth
                        variant = 'outlined'
                        size='small'
                        sx={{
                            '& .MuiInputBase-root':{
                                backgroundColor :'grey.200',
                                borderRadius :'.5rem',
                                '& fieldset':{
                                    border :'none'
                                }
                            }
                        }}
                        />
                    )}
                <Divider />

                {/* Query Params */}
                <Text fontSize='.87rem' fontWeight='500'>
                    Query Params
                </Text>

<Stack direction='row' width='100%' gap={1} alignItems={'center'}>

    {/* TOp K */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width='100%'>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Top K
                    </Text>

                    <TextField
                    name = 'topK'
                    value={values.topK}
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

                {/* minimum Score */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width='100%'>
                    <Text fontSize='.75rem' fontWeight='500'>
                        Minimum Score
                    </Text>

                    <TextField
                    name ='minimumScore'
                    value={values.minimumScore}
                    onChange={handleChange}
                        type='number'
                        variant='outlined'
                        size='small'
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
                </Stack>
                {/* RAG Template */}
                <Text fontSize='.87rem' fontWeight='500'>
                    RAG Template
                </Text>
                <TextField
                name='ragTemplate'
                    value={values.ragTemplate}
                    onChange={handleChange}
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
                Chunk Params
                </Text>                {/* chunks params */}

                <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
                    <TextFieldContainer label='Chunk Size
' >
                        <TextField
                        name='chunkSize'
                            value={values.chunkSize}
                            onChange={handleChange}
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
                        name='chunkOverlap'
                            value={values.chunkOverlap}
                            onChange={handleChange}
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
                        label={values.pdf_extract_images ? 'On' :'Off'}
                        onClick = {()=> setFieldValue('pdf_extract_images' , !values.pdf_extract_images)}
                        variant='outlined'
                        border='none'
                        backgroundColor='transparent'
                        textColor='grey.700'
                        sx={{
                            fontSize: '.75rem',
                            p: '0',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }}
                    />
                </Stack>
                <Divider />
                <UniversalButton
                    label='Reset Upload Directory'
                    variant='outlined'
                    width={'100%'}
                    startIcon={<FileCopyOutlined />}
                    sx={{
                        display: 'flex',
                        textAlign: 'left',
                        padding: '0.3rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        color: 'common.black',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontWeight: '500',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'grey.600',
                        },
                    }}
                />

                <UniversalButton
                    label='Reset Vector Storage'
                    variant='outlined'
                    width={'100%'}
                    startIcon={<Folder />}
                    sx={{
                        display: 'flex',
                        textAlign: 'left',
                        padding: '0.3rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        color: 'common.black',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontWeight: '500',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'grey.600',
                        },
                    }}
                />
            </Stack>
            <UniversalButton
            type ='submit'
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