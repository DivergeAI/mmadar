import { Divider, Stack ,useTheme} from '@mui/material';
import React from 'react';
import Text from '../common/Text';
import UniversalButton from '../common/UniversalButton';
import { Archive, Delete, FileCopy, ImportExport, Visibility } from '@mui/icons-material';

const ChatHistorySetting = () => {
    const theme = useTheme()
    return (
        <Stack height='100%'>
          
                <Stack justifyContent={'space-between'} alignItems='row' direction={'row'}>
                    <Text
                        fontSize='.87rem'
                        fontWeight='500'
                        sx={{
                            lineHeight: '1.25',
                        }}
                    >Chat History
                    </Text>
                    
                    <UniversalButton 
                label = 'On'
                backgroundColor='transparent'
                border= {'none'}
                size='small'
                width={'fit-content'}
                textColor='grey.900'
                sx={{
                    borderRadius: '5rem',
                    padding: '0',
                    '&:hover': {
                        border: `none`,
                        backgroundColor: 'transparent',
                    }
                }}
                startIcon = {<Visibility/>}
                />
                </Stack>
                <Text fontSize='.75rem' fontWeight='500' sx={{ color: theme.palette.grey[900] }}>
                This setting does not sync across browsers or devices.
                </Text>

              <Divider sx={{ my: 2 }} />

              <UniversalButton 
label='Import Chats'
variant='outlined'
width={'100%'}
startIcon ={<ImportExport />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>

<UniversalButton 
label='Export Chats'
variant='outlined'
width={'100%'}
startIcon ={<Delete />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>
<Divider sx={{my :1}}/>

<UniversalButton 
label='Archive All Chats'
variant='outlined'
width={'100%'}
startIcon ={<Archive />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>

<UniversalButton 
label='Delete All Chats'
variant='outlined'
width={'100%'}
startIcon ={<Delete />}
sx={{
    display :'flex',
    textAlign: 'left',
    padding: '0.3rem 1rem',
    borderRadius: '8px',
    border :'none',
    color: 'common.black',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '500',
    backgroundColor :'transparent',
    '&:hover': {
        backgroundColor: 'grey.600',    
    },
}}
/>

            </Stack>
          
    );
};

export default ChatHistorySetting;