import React, { Fragment } from 'react';
import { CONTROLS } from '../../types/chat';
import { ArrowLeft, ArrowRight, Cached, Close, ContentPasteRounded, KeyboardArrowLeft, KeyboardArrowRight, ModeEditOutlineOutlined, PlayCircleOutline, ThumbDownOffAlt, ThumbUpOffAlt, VolumeUpOutlined } from "@mui/icons-material";
import { Box, Button, Chip, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import Text from '../../components/common/Text';
import UniversalButton from '../../components/common/UniversalButton';

function AnswerControls() {
  const theme = useTheme();

  const [responseType, setResponseType] = React.useState<'good' | 'bad' | null>(null);

  const controls: CONTROLS[] = [
    {
      icon: <ModeEditOutlineOutlined />,
      title: "Edit",
      onClick: () => console.log('Edit clicked')
    },
    {
      icon: <ContentPasteRounded />,
      title: "Copy",
      onClick: () => console.log('Copy clicked')
    },
    {
      icon: <VolumeUpOutlined />,
      title: "Read Aloud",
      onClick: () => console.log('Read Aloud clicked')
    },
    {
      icon: <ThumbUpOffAlt />,
      title: "Good Response",
      onClick: () => setResponseType(responseType === 'good' ? null : 'good'),
      active: responseType === 'good'
    },
    {
      icon: <ThumbDownOffAlt />,
      title: "Bad Response",
      onClick: () => setResponseType(responseType === 'bad' ? null : 'bad'),
      active: responseType === 'bad'
    },
    {
      icon: <PlayCircleOutline />,
      title: "Continue Response",
      onClick: () => console.log('Continue Response clicked')
    },
    {
      icon: <Cached />,
      title: "Regenerate",
      onClick: () => console.log('Regenerate clicked')
    }
  ];

  const GOOD_RESPONSE = [
    "Good Response",
    "Great Response",
    "Helpful Response",
    "Informative Response",
    "Insightful Response",
    "Interesting Response",
    "Nice Response",
    "Perfect Response",
    "Useful Response",
    "Valuable Response",
    "Wonderful Response"
  ];

  const BAD_RESPONSE = [
    "Inaccurate Response",
    "Misleading Response",
    "Unhelpful Response",
    "Confusing Response",
    "Incomplete Response",
    "Poor Response",
    "Irrelevant Response"
  ];

  const responseOptions = responseType === 'good' ? GOOD_RESPONSE : BAD_RESPONSE;

  return (
    <Fragment>
      <Box className='controls' display={'flex'} gap={1} mb={1} alignItems={"center"}>
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton>
          <Icon fontSize='small'>
            <KeyboardArrowLeft />
          </Icon >
          </IconButton>
         
<Text fontSize='.875rem' fontWeight='600'
sx={{
  letterSpacing : '.1em'
}}>
  2/2
</Text>
          <IconButton>
          <Icon fontSize='small'>
            <KeyboardArrowRight />
          </Icon>
          </IconButton>
        </Stack >
        {controls.map((control) => (
          <Tooltip title={control.title} key={control?.title}>
            <IconButton
            size='small'
              onClick={control.onClick}
              sx={{
                padding: '0.2rem !important',
                fontSize: '1rem',
                backgroundColor: control.active ? theme.palette.grey[600] : 'inherit',
                // color: control.active ? theme.palette.common.white : 'inherit',
                '&:hover': {
                  backgroundColor: theme.palette.grey[600]
                }
              }}
            >
              <Icon fontSize='small'>{control.icon}</Icon>
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Response Block */}
      {responseType && (
        <Box
          component={'form'}
          borderRadius={'0.75rem'}
          py={'0.75rem'}
          px={'1rem'}
          border={`1px solid ${theme.palette.grey[300]}`}
          boxSizing={'border-box'}
        >
          {/* Head */}
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize="14px" fontWeight="400">
              {responseType === 'good' ? 'Tell us more about the good response:' : 'Tell us more about the bad response:'}
            </Text>
            <IconButton onClick={() => setResponseType(null)}>
              <Icon fontSize='small'>
                <Close fontSize={'small'} />
              </Icon>
            </IconButton>
          </Box>

          {/* Body */}
          <Stack spacing={1} direction={'column'}>
            <Stack direction={'row'} spacing={1} flexWrap={'wrap'} useFlexGap>
              {responseOptions.map((response, index) => (
                <Chip
                  key={index}
                  label={response}
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    borderRadius: '0.5rem'
                  }}
                  onClick={() => console.log(`${response} clicked`)}
                />
              ))}
            </Stack>

            <TextField
              variant="outlined"
              placeholder="Feel free to add specific details"
              fullWidth
              multiline
              rows={2}
              maxRows={2}
              sx={{
                marginY: '1rem',
                '& .MuiInputBase-root': {
                    padding: '0 !important',
                    '& textarea': {
                        padding: '1rem',
                        // resize: 'vertical',
                        fontFamily: 'system-ui',
                        fontSize: '.87rem',
                        fontWeight: '400',
                    }
                },
                '& :focus': {
                    borderColor: 'inherit !important'
                },
                '& fieldset': {
border : 'none'
                },
                '& :hover': {
                    borderColor: 'inherit !important'
                }
            }}
             
            />
          </Stack>

          {/* Footer */}
          <Box display={'flex'} flexDirection={'row-reverse'}>
          <UniversalButton
                    label={"Save"}
                    width={"fit-content"}
                    // height={"fit-content"}
                    fontSize={"medium"}
                    textColor="common.white"
                    sx={{
                        m: '1rem',
                      fontWeight: "500",
                      backgroundColor: "success.main",
                      border: "none ",
                      
                      borderRadius: ".5em",
                      padding: "0.75rem 1rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: 'success.dark',
                      },
                    }}
                    // startIcon  = {<Icon>
                    //     <ImportExport />
                    // </Icon> }
                  />
          </Box>
        </Box>
      )}
    </Fragment>
  );
}

export default AnswerControls;
