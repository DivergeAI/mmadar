import { Divider, Stack } from '@mui/material';
import React from 'react';
import Text from '../../../components/common/Text';
import UniversalButton from '../../../components/common/UniversalButton';
import { Delete, FileCopy } from '@mui/icons-material';

const DatabaseSettingAdmin = () => {
    return (
       <Stack gap={1}>
         <Text fontSize='.87rem' fontWeight='500'>
         Database
                </Text>

<UniversalButton 
label='Download Database'
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

<UniversalButton 
label='Export All Chats (All Users)'
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
<Divider />

<UniversalButton 
label='Export LiteLLM config.yaml'
variant='outlined'
width={'100%'}
startIcon ={<FileCopy />}
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

export default DatabaseSettingAdmin;