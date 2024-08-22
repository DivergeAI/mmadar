import { Box, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import ChatSection from './ChatSection';

function Home() {
    const theme = useTheme();
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            height={'100%'}
            border='1px solid green'
            p={2}
            boxSizing={'border-box'}
            gap={4}
        >
            <Box>
                Header
            </Box>

{/* Main Section */}

            <Box
                flexGrow={1}
                sx={{ overflowY: 'auto' }}
                border={'1px solid red'}
            >
                <ChatSection />
               
            </Box>

            {/* Search Section */}

            <div>

                <Box
                    border={'1px solid yellow'}

                >
                    Search
                </Box>
                <Text

                    sx={{
                        display: 'block',
                        textAlign: 'center',
                    }}>
                    LLMs can make mistakes. Verify important information.
                </Text>
            </div>

        </Box>
    );
}

export default Home;