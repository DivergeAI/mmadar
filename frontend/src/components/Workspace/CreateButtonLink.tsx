import { Add } from '@mui/icons-material';
import { Box, Icon, IconButton, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Text from '../common/Text';

type CreateButtonLinkProps = {
    path?: string
    title?: string
    description?: string
}

const CreateButtonLink = ({path, title , description} : CreateButtonLinkProps) => {

    const theme = useTheme();
    return (
        <Box
        display={'flex'}
        gap={2}
        mb={2}
        component={NavLink}
        to={path || ''}
        sx={{
            cursor: 'pointer',
            
        }}
    >
        <IconButton
            sx={{
                border: `1px dashed ${theme.palette.grey[400]}`,
                borderRadius: 10,
                padding: 1,
                '&:hover': {
                    backgroundColor: theme.palette.grey[300],
                    borderColor: theme.palette.grey[400]
                }
            }}
        >
            <Icon>
                <Add />
            </Icon>
        </IconButton>
        <Box>
            <Text fontSize='1rem' fontWeight='600' color='grey.800'>
{title}            </Text>
            <Text fontSize='0.875rem' fontWeight='400' color='grey.800'>
               {description}
            </Text>
        </Box>
    </Box>
    );
};

export default CreateButtonLink;