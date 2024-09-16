import { useParams } from 'react-router-dom';

import ChatLayout from '../Home/ChatLayout';
import useChat from '../Home/useChat';

function Chat() {
    const params = useParams();
    const id = params.id || '';
    const {
        chatResponse,
        setSearchPrompt,
        searchPrompt,
        selectedModels,
        AllModelList,
        setSelectedModels,
      handleSubmit,
      streamText,
    } = useChat( id );

    // Fetch chat data using query
    // const { data: ChatData } = useQuery({
    //     queryKey: ['chat', id],
    //     queryFn: () => getChatById(token, id),
    // });

    // Fetch all models
    // const { data: AllModelList } = useQuery({
    //     queryKey: ['modelList'],
    //     queryFn: () => getModels(token),
    // });

    // State for selected models
    // const [selectedModels, setSelectedModels] = useState<string[]>([]);

    // Update selectedModels when ChatData changes
//     useEffect(() => {
//         if (ChatData?.chat?.models) {
//             setSelectedModels(ChatData.chat.models);
//         }
//     }, [ChatData]);

// useEffect(() => {
// if(ChatData){
//     setChatResponse(ChatData)
// }

// }, [ChatData]);

    return (
 <ChatLayout
 chatResponse={chatResponse}
 selectedModels={selectedModels}
 AllModelList={AllModelList}
 setSelectedModels={setSelectedModels}
 handleSubmit={handleSubmit}
 searchPrompt={searchPrompt}
 setSearchPrompt={setSearchPrompt}
 streamText={streamText}
 />
    );
}

export default Chat;


// import { Box, useTheme } from '@mui/material';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import HeaderSection from '../Home/HeaderSection';
// import ChatSection from '../Home/ChatSection';
// import SearchSection from '../Home/SearchSection';
// import Text from '../../components/common/Text';
// import { getChatById } from '../../api/chats';
// import { getModels } from '../../api';

// function Chat() {
//     const theme = useTheme();
//     const token: string = localStorage.getItem('token') || '';
//     const [chatResposne, setChatResponse] = useState<any>(null);
//     const params = useParams();
//     const id = params.id || '';

//     // Fetch chat data using query
//     const { data: ChatData } = useQuery({
//         queryKey: ['chat', id],
//         queryFn: () => getChatById(token, id),
//     });

//     // Fetch all models
//     const { data: AllModelList } = useQuery({
//         queryKey: ['modelList'],
//         queryFn: () => getModels(token),
//     });

//     // State for selected models
//     const [selectedModels, setSelectedModels] = useState<string[]>([]);

//     // Update selectedModels when ChatData changes
//     useEffect(() => {
//         if (ChatData?.chat?.models) {
//             setSelectedModels(ChatData.chat.models);
//         }
//     }, [ChatData]);

// useEffect(() => {
// if(ChatData){
//     setChatResponse(ChatData)
// }

// }, [ChatData]);

//     return (
//         <Box
//             position={'relative'}
//             display={'flex'}
//             flexDirection={'column'}
//             width={'100%'}
//             height={'100%'}
//             p={2}
//             boxSizing={'border-box'}
//             gap={4}
//         >
//             {/* Header Section */}
//             <HeaderSection
//                 models={AllModelList}
//                 selectedModels={selectedModels}
//                 setSelectedModels={setSelectedModels}
//             />

//             {/* Main Section */}
//             <Box
//                 width={"100%"}
//                 height={'100%'}
//                 maxWidth={{ sm: '100%', md: '90%', lg: '64rem' }}
//                 margin={'auto'}
//                 flexGrow={1}
//                 sx={{ overflowY: 'auto' }}
//             >
//                 <ChatSection chat = {chatResposne} setChat={setChatResponse}/>
//             </Box>

//             {/* Search Section */}
//             <Box
//                 width={"100%"}
//                 maxWidth={{ sm: '100%', lg: '72rem' }}
//                 margin={'auto'}
//                 padding={"1.5rem 1.5rem 0"}
//             >
//                 <SearchSection />
//                 <Text
//                     fontSize='.75rem'
//                     color='grey.500'
//                     sx={{
//                         display: 'block',
//                         textAlign: 'center',
//                         marginTop: '0.5rem',
//                     }}>
//                     LLMs can make mistakes. Verify important information.
//                 </Text>
//             </Box>
//         </Box>
//     );
// }

// export default Chat;





