import { Box, Button, Stack } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { fetchAllDocuments } from '../../../redux/slices/documents/thunk';
import Text from '../../../components/common/Text';
import { stat } from 'fs';
import { removeFirstHashWord } from '../../../utils/functions';

const DocumentsPopover = ({prompt,setFiles,setPrompt} : any) => {
    const [selectedDocument, setSelectedDocument] = useState<any>(null);
    const [collections,setCollections] = useState<any>(null);
    const [selectedIdx, setSelectedIdx] = useState(0);


    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const documents = useSelector((state: any) => state.documents.documents);

    useEffect(() => {
        if (!documents?.length) {
            dispatch(fetchAllDocuments())
        }
    }, []);

    useEffect(() => {
        const allCollections = [...(documents?.length > 0 ?
            [
                {
                    name: 'All Documents',
                    type: 'collection',
                    title: 'All Documents',
                    collection_names: documents?.map((doc:any) => doc?.collection_name),
                },
            ]
            : []),
            ...Array.from(
                new Set(
                  documents?.reduce((acc:any, doc:any) => {
                    const tags = doc.content?.tags ?? [];
                    return [...acc, ...tags.map((tag:any) => tag.name)];
                  }, [])
                )
              )
              .map((tag) => ({
                name: tag,
                type: 'collection',
                collection_names: documents
                  .filter((doc:any) => (doc.content?.tags ?? []).map((tag:any) => tag.name).includes(tag))
                  .map((doc:any) => doc.collection_name),
              })),
            ];
        
            setCollections(allCollections);

    }, [documents]);

    const findByName = (obj: any, prompt: string) => {
		const name = obj.name.toLowerCase();
		return name.includes(prompt.toLowerCase().split(' ')?.at(0)?.substring(1) ?? '');
	};

    const filteredCollections = collections?.filter((collection:any) => findByName(collection, prompt));

    // Filter documents by name
    const filteredDocs = documents?.filter((doc:any) => findByName(doc, prompt));

const filteredItems = [...(filteredCollections || []), ...(filteredDocs || [])];
   
    return (
        <Fragment>
                {filteredItems.length > 0 && (
            <Box
                position={'absolute'}
                bottom={'100%'}
                left={0}
                width={'100%'}
                zIndex={100}
                maxWidth={'100%'}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    // display : 'none'
                }}
            >
                <Stack direction={'row'} gap={2}>
                    <Box
                        width={'fit-content'}
                        // height={'100%'}
                        p={2}
                        sx={{
                            backgroundColor: '#F5F5F5',
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px',
                            minHeight: '100%',
                        }}
                    >
                        #
                    </Box>




                    <Stack direction={'column'} maxHeight={'200px'} width={'100%'} overflow={'auto'}
                    >
                        {filteredItems?.map((document: any, index: number) => (
                            <Box
                                component={Button}
                                onClick={() => 
                                {
                                    setFiles((prevFiles: any) =>    [...prevFiles ,{...document, type : document?.type ?? 'file', 
                                        status : 'processed'
                                    }
                                    ])
                                   setPrompt( removeFirstHashWord(prompt))
                                }
                                    // setSelectedDocument(document)
                                }
                                key={index} p={1} width={'100%'}
                                onMouseOver={() => setSelectedIdx(index)}
                                sx={{
                                    display: 'flex',
                                    textTransform: 'none',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    backgroundColor: selectedIdx === index ? '#F5F5F5' : 'white',
                                    color: 'common.black',
                                    px: '.75rem',
                                    py: '.35rem',
                                    borderRadius: 1.5,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#F5F5F5'

                                    }
                                }}>
                                {document?.type === 'collection' ?
                                    <Box>
                                        <Text fontWeight='500'
                                            color='common.black'
                                            fontSize='1rem'
                                            lines={1}
                                            sx={{
                                                overflow: 'hidden',
                                                textAlign: 'left'
                                            }}>
                                            {document?.title ?? `#${document?.name}`}
                                        </Text>
                                        <Text fontSize='.75rem' 
                                        lines={1}
                                            sx={{
                                                textAlign: 'left',
                                                overflow: 'hidden',
                                            }}>
                                            Collection
                                        </Text>
                                    </Box>
                                    :
                                    <Box>
                                        <Text
                                            fontWeight='500'
                                            color='common.black'
                                            fontSize='1rem'
                                            lines={1}
                                            sx={{
                                                overflow: 'hidden',
                                                textAlign: 'left'
                                            }}>
                                            {`#${document?.name}`} ({document?.filename})
                                        </Text>

                                        <Text fontSize='.75rem'
                                            lines={1}
                                            sx={{
                                                textAlign: 'left',
                                                overflow: 'hidden'
                                            }}>
                                            {document.title}
                                        </Text>
                                    </Box>

                                }

                            </Box>
                        ))}
                    </Stack>


                </Stack>

            </Box>
)}

        </Fragment>
    );
};

export default DocumentsPopover;