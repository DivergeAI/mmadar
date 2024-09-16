// src/components/ChatLayout.tsx
import React from 'react';
import { Box } from '@mui/material';
import HeaderSection from '../Home/HeaderSection';
import ChatSection from '../Home/ChatSection';
import SearchSection from '../Home/SearchSection';
import Text from '../../components/common/Text';
import NewChatPage from './NewChatPage';

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
}:ChatLayoutProps) => {
    console.log(chatResponse);
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
                <ChatSection chat={chatResponse} streamText={streamText}/>
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