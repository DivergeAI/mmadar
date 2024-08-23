import { Box, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import ChatSection from './ChatSection';
import SearchSection from './SearchSection';

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
            <Box>
                Header
            </Box>

{/* Main Section */}

            <Box
            width={"100%"}
            maxWidth={{sm:'100%' , lg: '64rem'} }
            margin={'auto'}
                flexGrow={1}
                sx={{ overflowY: 'auto' }}
            >
                <ChatSection />
               
            </Box>

            {/* Search Section */}

            <Box 
            width={"100%"}
                maxWidth = {{sm:'100%' , lg: '72rem'} }
                margin={'auto'}
                padding={"1.5rem"}
            >

               <SearchSection />    
                <Text

                    sx={{
                        display: 'block',
                        textAlign: 'center',
                    }}>
                    LLMs can make mistakes. Verify important information.
                </Text>
            </Box>

        </Box>
    );
}

export default Home;