import { CopyAllOutlined, EditOutlined } from '@mui/icons-material';
import { Avatar, Box, Icon, IconButton } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';




function ChatSection() {
    return (
        <Box
        display={'flex'}
        gap={1}
        flexDirection={'column'}
        >
            {/* Question */}

<div>
            <Box
                p={1}
                mb={1}
                border={'1px solid green'}
                borderRadius={50}
                maxWidth={'fit-content'}
                minWidth={'50%'}
                    marginLeft={'auto'}                >
                Question
                </Box>

                {/* copy Buttons */}

                <Box 
                display={'flex'}
                justifyContent={'flex-end'}
                border={'1px solid blue'}
                >
                    <IconButton>
                        <CopyAllOutlined />
                    </IconButton>
                    <IconButton>
                        <EditOutlined />
                    </IconButton>
                </Box>
                </div>

                {/* Answer */}

                <Box display={'flex'}
                alignItems={'start'}
                gap={2}
                >
                    <Avatar />
                    <Box>
                        <Text>
                            Title
                        </Text>
                        <Box>
                            Answer
                        </Box>
                    </Box>
                </Box>
            
        </Box>
    );
}

export default ChatSection;




// {[...Array(100).keys()].map((item, index) => (
//     <Box key={item} p={2} border={'1px solid blue'} mb={2}>
//         {index}
//     </Box>
// ))}