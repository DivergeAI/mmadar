import { Box, Icon, Stack, useTheme } from '@mui/material';
import Text from '../Text';
import { CancelRounded, Close, FileCopy } from '@mui/icons-material';
import { formatFileSize } from '../../../utils/functions';

function UploadFileDisplay({ key, file, removeFile, onFileClick }: any) {
  const theme = useTheme();


  return (
    <Box
      key={key}
      id="upload-file-display"
      position={"relative"}
      display={"flex"}
      border={`1px solid ${theme.palette.grey[400]}`}
      sx={{
        background: theme.palette.common.white,
        width: '18rem',
        height: '3.5rem',
        borderTopRightRadius: '0.75rem',
        borderBottomRightRadius: '0.75rem',
        cursor: 'pointer',

        borderTopLeftRadius: '0.75rem',
        borderBottomLeftRadius: '0.75rem',

      }}

      onClick={onFileClick && onFileClick}
    >
      <Box
        sx={{
          padding: '1rem 1rem',
          borderTopLeftRadius: '0.75rem',
          borderBottomLeftRadius: '0.75rem',
          backgroundColor: theme.palette.customRed.light,
          color: theme.palette.common.white,
        }}>

        {/* <Icon fontSize='small'> */}
        {file?.status === 'processed' ?
          <FileCopy sx={{
            width: 20,
            height: 20,
          }} /> :
          <Close sx={{
            width: 20,
            height: 20,
          }} />}

        {/* </Icon> */}

      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          pr: '1rem',
          marginLeft: '1rem',
        }}>
        <Text
          lines={1}
          fontSize="0.87rem"
          fontWeight="500"
          sx={{
            overflow: 'hidden',
          }}
        >
          {file.name}
        </Text>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={2} width={'100%'}>
          <Text
            fontSize="0.75rem"
            color={theme.palette.grey[700]}
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {file?.type ?? 'file'}
          </Text>
          {file?.size && <Text
            fontSize="0.75rem"
            color={theme.palette.grey[500]}>
            {formatFileSize(file.size)}
          </Text>}
        </Stack>
      </Box>
      {removeFile && <span
        onClick={() => removeFile()}
        className="close-icon"
        style={{
          position: 'absolute',
          top: '-5px',
          right: '-3px',
          // padding : '1rem',
          cursor: 'pointer',
          borderRadius: '100%',
        }}>
        <Icon fontSize='small' >
          <CancelRounded />
        </Icon>
      </span>}
    </Box>
  );
}

export default UploadFileDisplay;