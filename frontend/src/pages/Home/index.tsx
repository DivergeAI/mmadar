import { Box, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import ChatSection from './ChatSection';
import SearchSection from './SearchSection';
import HeaderSection from './HeaderSection';
import NewChatPage from './NewChatPage';
import { useQuery } from '@tanstack/react-query';
import { getBackendConfig, getModels } from '../../api';

function Home() {
    const theme = useTheme();
    const token:string = localStorage.getItem('token') || '';

    const {data:AllModelList} = useQuery({
        queryKey : ['modelList'],
        queryFn : () => getModels(token),
    })


const {data:ApiConfigData} = useQuery({
    queryKey : ['config'],
    queryFn :  getBackendConfig,
})

console.log("Api Config Data",ApiConfigData)

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
           <HeaderSection models={AllModelList}/>

        {/* Main Section */}


            <Box
            width={"100%"}
            height={'100%'}
            maxWidth={{sm:'100%' , lg: '64rem'} }
            margin={'auto'}
                flexGrow={1}
                sx={{ overflowY: 'auto' }}
                // border={'1px solid'}
            >
                {/* <ChatSection /> */}
                
                <NewChatPage promptSuggestions = {ApiConfigData?.default_prompt_suggestions}/>
               
            </Box>

            {/* Search Section */}

            <Box 
            width={"100%"}
                maxWidth = {{sm:'100%' , lg: '72rem'} }
                margin={'auto'}
                padding={"1.5rem 1.5rem 0"}
            >

               <SearchSection />    
                <Text

                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                    }}>
                    LLMs can make mistakes. Verify important information.
                </Text>
            </Box>

        </Box>
    );
}

export default Home;