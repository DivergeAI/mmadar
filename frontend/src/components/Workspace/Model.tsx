import { Avatar, Icon, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import Text from '../common/Text';
import { Edit } from '@mui/icons-material';
import SelectMenu from '../common/SelectMenu';
import { NavLink } from 'react-router-dom';

const Model = ({model}:any) => {

    return (
        <Stack
       
        direction={`row`}
        justifyContent={`space-between`}
        alignItems={`center`}
        sx={{
            padding: '.5rem .75rem',
            borderRadius: '.75rem',
            '&:hover': {
                backgroundColor: 'grey.300'
            }
        }}
        >
<Stack direction={'row'} gap={2}  component={NavLink}
        to={model.to}>
<Avatar src={model.avatar} sizes='small' />
           {/* title */}
           <div>
            <Text fontSize='1rem' fontWeight='600'>
            mixtral:latest            </Text>
            <Text fontSize='14px' fontWeight='400'>
            mixtral:latest            </Text>
           </div>
</Stack>
            
            {/* Controls */}
            <Stack direction='row' spacing={1} alignItems={'center'}>
                {/* Edit */}
                <Tooltip title='Edit'>
                    <IconButton>
                        <Icon>
                            <Edit />
                        </Icon>
                        </IconButton>
                </Tooltip>
                {/* Delete */}
                <Tooltip title='More'>
                    <SelectMenu options={[]}/>
                </Tooltip>
                
                </Stack>
        </Stack>
    );
};

export default Model;