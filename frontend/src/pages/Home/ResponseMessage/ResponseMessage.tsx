import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Icon, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import AnswerControls from '../AnswerControls';
import Text from '../../../components/common/Text';
import dayjs from 'dayjs';
import UniversalButton from '../../../components/common/UniversalButton';
import { replaceTokens, sanitizeResponseContent, handleCopyText } from '../../../utils/functions';
import Skelton from '../../../components/common/Skelton';
import { marked } from 'marked';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../redux/slices/auth/thunks';
import { AppDispatch } from '../../../redux/store'; // Import the AppDispatch type
import MarkdownTokens from './MarkdownTokens';
import { Close } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { Citation } from '../../../types/chat';

type ShowCitationsType ={
    open : boolean,
    data : Citation | null
}

const ResponseMessage = ({ index, message, history, streamText, messages, regenerateResponse, showNextMessage, showPreviousMessage }: any) => {

    const theme = useTheme()
    const [editResponseMessage, setEditResponseMessage] = useState(null);
    const [editMessage, setEditMessage] = useState('');
    const [tokens, setTokens] = useState<any>(null);
    const [citations, setCitations] = useState<Citation[] | []>([]);
    const [showCitations, setShowCitations] = useState<ShowCitationsType>({
        open: false,
        data: null,
    });

    let user = useSelector((state: any) => state.auth.user)

    const dispatch: AppDispatch = useDispatch<AppDispatch>()


    const selectedCitation: any[] = showCitations?.data && showCitations?.data?.document?.map((doc: any, index: number) => {
        return {
            source: showCitations?.data?.source,
            document: doc,
            metadata: showCitations?.data?.metadata?.[index],
        }
    }) || [];


    useEffect(() => {
        if (message?.content || streamText) {
            let token = marked.lexer(
                replaceTokens(sanitizeResponseContent(message?.content || streamText), message?.model, user?.name)
            )
            setTokens(token)
        }
    }, [message?.content, streamText]);


    useEffect(() => {
        if (!user){
            dispatch(fetchUser())
        }
    }, [])

    // ciation logic
    useEffect(() => {
        if (message?.citations?.length) {
            let citations = message?.citations?.reduce((acc: any, citation: any) => {
                citation?.document?.map((document: any, index: number) => {
                    const metadata = citation?.metadata?.[index]
                    const id = metadata?.source ?? 'N/A'
                    let source = citation?.source
                    if (metadata?.name) {
                        source = { ...source, name: metadata.name };
                    }

                    // Check if ID looks like a URL
                    if (id.startsWith('http://') || id.startsWith('https://')) {
                        source = { name: id };
                    }
                    const existingSource = acc.find((item: any) => item.id === id);
                    if (existingSource) {
                        existingSource.document.push(document);
                        existingSource.metadata.push(metadata);
                    } else {
                        acc.push({
                            id,
                            document: [document],
                            metadata: metadata ? [metadata] : [],
                            source,
                        })
                    }

                })
                return acc
            }, [])
            setCitations(citations)
        }

    }, [message?.citations]);


    return (
        <Fragment>
            {editResponseMessage === index ? (
                <Box
                    p={1}
                    mb={1}
                    maxWidth={"100%"}
                    width={"100%"}
                    marginLeft={"auto"}
                    sx={{
                        padding: "0.75rem 1.25rem",
                        borderRadius: "1.25rem",
                        backgroundColor: theme.palette.grey[200],
                    }}
                >
                    <TextField
                        name='editMessage'
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        variant="outlined"
                        placeholder="Feel free to add specific details"
                        fullWidth
                        autoFocus
                        multiline
                        //    rows={2}
                        onFocus={(event) => {
                            const input = event.target;
                            const length = input.value.length;
                            input.setSelectionRange(length, length);
                        }}

                        sx={{
                            marginY: '1rem',
                            '& .MuiInputBase-root': {
                                padding: '0 !important',
                                '& textarea': {
                                    resize: 'none',
                                    fontFamily: 'system-ui',
                                    fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                    fontWeight: '400',
                                }
                            },
                            '& :focus': {
                                borderColor: 'inherit !important'
                            },
                            '& fieldset': {
                                border: 'none'
                            },
                            '& :hover': {
                                borderColor: 'inherit !important'
                            }
                        }}
                    />
                    <Stack direction={'row'} justifyContent={'end'} gap={1}>
                        <UniversalButton
                            label={"Cancel"}
                            width={"fit-content"}
                            fontSize={"medium"}
                            textColor="grey.900"
                            onClick={() => {
                                setEditResponseMessage(null);
                                setEditMessage('');
                            }}
                            sx={{
                                fontWeight: "500",
                                backgroundColor: "common.white",
                                border: "none ",
                                borderRadius: "10rem",
                                padding: "0.75rem 1rem",
                                lineHeight: "1",
                                "&:hover": {
                                    backgroundColor: 'grey.300',
                                },
                            }}
                        />
                        <UniversalButton
                            onClick={() => {

                                //    confirmEditMessage(message?.id, editMessage)
                            }}
                            label={"Send"}
                            width={"fit-content"}
                            fontSize={"medium"}
                            textColor="common.white"
                            sx={{
                                fontWeight: "500",
                                backgroundColor: "common.black",
                                border: "none ",
                                borderRadius: "10rem",
                                padding: "0.75rem 1rem",
                                lineHeight: "1",
                                "&:hover": {
                                    backgroundColor: 'common.black',
                                },
                            }}
                        />
                    </Stack>
                </Box>
            )
                :
                (
                    message?.role === 'assistant' && (
                        <Box id='answerBlock' className='prose'>
                            <Box display={"flex"} alignItems={"start"} gap={2} id='answer-div'>
                                <Avatar />
                                <Box display='flex' flexDirection='column' width={'100%'} gap={1}>
                                    {/* model name & time (when hover) */}
                                    <Box display={'flex'} gap={1} alignItems={'center'}>
                                        <Text fontSize="14px" fontWeight="600">{history?.messages[message?.parentId]?.models}</Text>
                                        {message?.timestamp && <Text
                                            fontSize="0.75rem"
                                            fontWeight="500"
                                            color={theme.palette.grey[500]}
                                            sx={{
                                                textTransform: 'uppercase'
                                            }}
                                            props={{
                                                className: 'time-text'
                                            }}
                                        >{dayjs(message.timestamp * 1000).format('h:mm a')}</Text>}
                                    </Box>
                                    {/* answer */}
                                    {(message?.content === '' && streamText === '') ?
                                        <Skelton />

                                        : (message?.content !== '' || streamText !== '') &&

                                        <MarkdownTokens tokens={tokens} id={message?.id} />

                                    }
                                    {/* citations */}
                                    {message?.citations?.length > 0 &&
                                        <Stack flexDirection={'row'} flexWrap={'wrap'} gap={.5}>
                                            {citations?.map((citation: Citation, index: number) => (
                                                <Button
                                                    onClick={() => setShowCitations({ open: true, data: citation })}
                                                    key={citation?.id}
                                                    sx={{
                                                        display: 'flex',
                                                        width: 'fit-content',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        fontSize: '0.75rem',
                                                        textTransform: 'capitalize',
                                                        gap: 1,
                                                        padding: '0.25rem',
                                                        borderRadius: '.75rem',
                                                        backgroundColor: theme.palette.grey[200],
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.grey[400],
                                                        }
                                                    }}
                                                    disableRipple
                                                >
                                                    <Text fontSize={'.75rem'}
                                                        color={'common.black'}
                                                        fontWeight={'600'}
                                                        sx={{
                                                            width: '1rem',
                                                            height: '1rem',
                                                            backgroundColor: 'common.white',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        {index + 1}</Text>
                                                    <Text fontSize={'.75rem'}
                                                        fontWeight='600' color={'common.black'}>{citation?.source?.name}</Text>
                                                </Button>

                                            ))}
                                        </Stack>
                                    }

                                    {/* controls */}
                                    {(history?.messages[message?.parentId]?.childrenIds?.length > 1 || message?.done) &&
                                        <AnswerControls
                                            onEdit={() => {
                                                setEditResponseMessage(index)
                                                setEditMessage(message?.content)
                                            }}
                                            isLastMessage={index + 1 === messages?.length}
                                            message={message}
                                            siblings={history?.messages[message?.parentId]?.childrenIds ?? []}
                                            regenerateResponse={regenerateResponse}
                                            showNextMessage={showNextMessage}
                                            showPreviousMessage={showPreviousMessage}
                                            handleCopyText={() => handleCopyText(message?.content)}


                                        />
                                    }
                                </Box>
                            </Box>
                        </Box>
                    ))
            }

            <Dialog
                open={showCitations.open}
                onClose={() => setShowCitations({ open: false, data: null })}
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '1rem',
                        padding: '1rem',
                        maxWidth: '800px',
                        maxHeight: '450px',
                        width: '100%',
                        backgroundColor: theme.palette.common.white,
                    }
                }}
            >
                <DialogTitle
                sx={{
                    display : 'flex',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    padding : '0 1rem',
                   
                }}
                >
                    <Text fontSize='1.125rem' fontWeight='500'>
                        Citation
                    </Text>
                    <IconButton onClick={()=>  setShowCitations({ open: false, data: null })}>
                        <Icon fontSize='small'>
                            <Close/>
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{
                    padding : '1rem',
                }}>
                    {selectedCitation?.map((citation: any, index: number) => (
                        <Box>
                            {/* First Citation */}
                            <Text 
                            
                            fontSize='.875rem' fontWeight='500'
                            color='common.black'
                            sx={{
                                fontFamily:'system-ui'
                            }}
                            
                            >
                                Source
                            </Text>
                            <Typography 
                            component={NavLink}
                            to={citation?.metadata?.file_id
                                ? `/api/v1/files/${citation?.metadata?.file_id}/content`
                                : citation.source.name.includes('http')
                                ? citation.source.name
                                : `#`}
                                target='_blank'
                            sx={{
                                fontFamily:'system-ui',
                                fontWeight : '400',
                                fontSize : '.875rem',
                                color : theme.palette.common.black,
                                '&:hover':{
                                    color : theme.palette.common.black,
                                }
                            }}
                            >
                                {citation?.source?.name}
                            </Typography>
                            <Text fontSize='.875rem' fontWeight='500' sx={{

                            }}>
                                Content
                            </Text>
                            <pre style={{
                                whiteSpace: 'pre-line',
                                fontSize: '.875rem',
                                fontStyle: 'system-ui !important',
                                fontWeight: '400',
                                color: theme.palette.common.black,
                            }}>
                                {citation?.document}
                            </pre>

                            {index < selectedCitation?.length - 1 && (
                                <Divider sx={{
                                    my: '.75rem'
                                }} />
                            )}
                        </Box>

                    ))}
                </DialogContent>
            </Dialog>

        </Fragment>

    );
};

export default ResponseMessage;