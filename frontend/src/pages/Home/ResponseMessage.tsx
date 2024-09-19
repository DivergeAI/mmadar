import { Avatar, Box, Stack, TextField, useTheme } from '@mui/material';
import React, { Fragment, useState } from 'react';
import AnswerControls from './AnswerControls';
import Text from '../../components/common/Text';
import dayjs from 'dayjs';
import UniversalButton from '../../components/common/UniversalButton';
import { copyToClipboard } from '../../utils/functions';
import Skelton from '../../components/common/Skelton';
import Markdown from 'markdown-to-jsx';
import ReactMarkdown from 'react-markdown';

const ResponseMessage = ({ index, message,handleCopyText, history, streamText, messages, regenerateResponse, showNextMessage, showPreviousMessage }: any) => {

    const theme = useTheme()
    const [editResponseMessage, setEditResponseMessage] = useState(null);
    const [editMessage, setEditMessage] = useState('');

   
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
                        <div id='answerBlock'>
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

                                :( message?.content !=='' || streamText !== '' )&&
                                    // <Box
                                    //     sx={{
                                    //         width: '100%',
                                    //         maxWidth: '100%',
                                    //         color: 'inherit',
                                    //         '& p': { margin: 0 },
                                    //         '& img': { margin: '4px 0' },
                                    //         '& h1, h2, h3, h4, h5, h6': { margin: '4px 0' },
                                    //         '& pre': { margin: 0 },
                                    //         '& table': { margin: 0 },
                                    //         '& blockquote': { margin: 0 },
                                    //         '& ul': { marginTop: '-8px' },
                                    //         '& ol': { marginTop: '-8px' },
                                    //         '& li': { marginTop: '-12px' },
                                    //         whiteSpace: 'pre-line',
                                    //     }}

                                    // >
                                    //     {message.content || streamText}
                                    // </Box>
                                    <ReactMarkdown>
                                        {message.content || streamText}
                                    </ReactMarkdown>
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
                                        handleCopyText = {()=> handleCopyText(message?.content) }
                                    

                                    />
}
                                </Box>
                            </Box>
                        </div>
                    ))
            }

        </Fragment>

    );
};

export default ResponseMessage;