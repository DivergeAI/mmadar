import { Box, Icon, Stack, useTheme } from '@mui/material';
import Text from '../Text';
import { CancelRounded, Close, FileCopy } from '@mui/icons-material';
import { formatFileSize } from '../../../utils/functions';

function UploadFileDisplay({file}:any) {
    const theme = useTheme();
    return (
        <Box
        id = "upload-file-display"
        position={"relative"}
         display={"flex"}
         border={`1 px solid ${theme.palette.grey[400]}`}
        sx={{
          background : theme.palette.common.white,
          width : '18rem',
          height : '3.5rem',
          borderTopRightRadius : '0.75rem',
          borderBottomRightRadius : '0.75rem', 
          cursor : 'pointer',

        }}
         >
          <Box 
          sx={{
            padding : '1rem 1rem',
            borderTopLeftRadius : '0.75rem',
            borderBottomLeftRadius : '0.75rem',   
            backgroundColor : theme.palette.customRed.light,
            color : theme.palette.common.white ,
                  }}>
         
            {/* <Icon fontSize='small'> */}
              <FileCopy sx={{
                width : 20,
                height : 20,
              }}/>
            {/* </Icon> */}

          </Box>
          <Box 
          sx={{
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'center',
            width : '100%',
            pr : '1rem',
            marginLeft : '1rem',
          }}>
            <Text
            props={{
            
            }}
            fontSize="0.87rem"
            fontWeight="500"
            >
             {file.name}
            </Text>
            <Stack direction={'row'} justifyContent={'space-between'} spacing={2} width={'100%'}>
              <Text 
              fontSize="0.75rem"
              color={theme.palette.grey[700]}

              >
              File
              </Text>
              <Text
              fontSize="0.75rem"
              color={theme.palette.grey[500]}>
                {formatFileSize(file.size)} 
              </Text>
            </Stack>
            </Box>
            <span 
             className = "close-icon"
            style={{
              position : 'absolute',
              top : '-5px',
              right : '-3px',
              // padding : '1rem',
              cursor : 'pointer',
              borderRadius : '100%',
            }}>
              <Icon fontSize='small'>
                <CancelRounded/>
              </Icon>
            </span>
            </Box> 
    );
}

export default UploadFileDisplay;