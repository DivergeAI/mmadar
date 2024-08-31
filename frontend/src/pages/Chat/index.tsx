import { Box, Button, Icon, IconButton, useTheme } from '@mui/material';
import Text from '../../components/common/Text';
import HeaderSection from '../Home/HeaderSection';
import ChatSection from '../Home/ChatSection';
import SearchSection from '../Home/SearchSection';
import { QuestionMark } from '@mui/icons-material';

function Chat() {
    const theme = useTheme();
    return (
        <Box
        position={'relative'}
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
            maxWidth={{sm:'100%' , md:'90%', lg: '64rem'} }
            margin={'auto'}
                flexGrow={1}
                sx={{ overflowY: 'auto' }}
                // border={'1px solid'}
            >
                <ChatSection />
                
               
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
fontSize='.75rem'
color='grey.500'
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '0.5rem',
                    }}>
                    LLMs can make mistakes. Verify important information.
                </Text>
            </Box>
            <IconButton 
            
            sx={{
                backgroundColor : 'grey.400',
                padding : '0rem',
                position : 'absolute',
                bottom : '1rem',
                right : '1rem',
            }}>
            <Icon fontSize='small'>
              <QuestionMark sx={{
                width: '.8rem'
              }}/>
</Icon>
            </IconButton>

        </Box>
    );
}

export default Chat;