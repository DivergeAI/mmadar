// src/components/ChatLayout.tsx
import React from 'react';
import { Box } from '@mui/material';
import HeaderSection from '../Home/HeaderSection';
import ChatSection from '../Home/ChatSection';
import SearchSection from './SearchSection/SearchSection';
import Text from '../../components/common/Text';
import NewChatPage from './NewChatPage';
import { FileItem } from '../../types/chat';

type ChatLayoutProps = {
    chatResponse: any;
    selectedModels: string[] | null;
    setSelectedModels: (value: string[]) => void;
    searchPrompt: string;
    setSearchPrompt: (value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    AllModelList?: any;
    streamText ?: string;
    ApiConfigData?: any;
    messages?: any;
    sendPrompt?: any;
    setHistory?: any;
    stopResponse :()=> void
    showNextMessage ?: (message:any)=> void
showPreviousMessage ?: (message:any)=> void
confirmEditMessage ?: (messageId: any,content:string)=>void
regenerateResponse ?: (message:any)=>void
files : FileItem[],
setFiles : (files:FileItem[])=>void,
deleteMessageHandler : (messageId:any)=>void
};


const ChatLayout = ({
    chatResponse,
    selectedModels,
    setSelectedModels,
    searchPrompt,
    setSearchPrompt,
    handleSubmit,
    AllModelList,
    streamText,
    ApiConfigData,
    sendPrompt,
    setHistory,
    stopResponse,
    showNextMessage,
showPreviousMessage,
confirmEditMessage,
regenerateResponse,
files,
deleteMessageHandler,
setFiles

}:ChatLayoutProps) => {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            height={'100%'}
            p={2}
            boxSizing={'border-box'}
            gap={4}
        >
            <HeaderSection
                models={AllModelList}
                selectedModels={selectedModels}
                setSelectedModels={setSelectedModels}
            />

            <Box
                width={'100%'}
                height={'100%'}
                maxWidth={{ sm: '100%', md: '90%', lg: '64rem' }}
                margin={'auto'}
                flexGrow={1}
                sx={{ overflowY: 'auto' }}
            >
                 {chatResponse?.chat?.messages?.length > 0 ? (
                <ChatSection 
                chat={chatResponse} 
                streamText={streamText} 
                selectedModels={selectedModels} 
                sendPrompt={sendPrompt} 
                setHistory={setHistory}
                showNextMessage={showNextMessage}
                showPreviousMessage={showPreviousMessage}
                    confirmEditMessage={confirmEditMessage}
                    regenerateResponse={regenerateResponse}
                    files ={files}
                    setFiles ={setFiles}
                    deleteMessageHandler={deleteMessageHandler}
                />
            ) : (
                    <NewChatPage
                        promptSuggestions={ApiConfigData?.default_prompt_suggestions}
                        setPrompt={setSearchPrompt}
                    />
                )}
            </Box>

            <Box
                width={'100%'}
                maxWidth={{ sm: '100%', lg: '72rem' }}
                margin={'auto'}
                padding={'1.5rem 1.5rem 0'}
            >
                <SearchSection
                    search={searchPrompt}
                    setSearch={setSearchPrompt}
                    handleSubmit={handleSubmit}
                    stopResponse = {stopResponse}
                    files={files}
                    setFiles={setFiles}

                />
                <Text
                    fontSize='.75rem'
                    color='grey.500'
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                    }}
                >
                    LLMs can make mistakes. Verify important information.
                </Text>
            </Box>
        </Box>
    );
};

export default ChatLayout;