import { Box, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import ChatSection from './ChatSection';
import SearchSection from './SearchSection';
import HeaderSection from './HeaderSection';
import NewChatPage from './NewChatPage';

function Home() {
    const theme = useTheme();
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
           <HeaderSection />

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
                
                <NewChatPage />
               
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