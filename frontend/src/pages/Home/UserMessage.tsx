import { Box, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import React, { Fragment, useState } from 'react';
import UniversalButton from '../../components/common/UniversalButton';
import { CopyAllOutlined, Delete, DeleteOutline, EditOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Text from '../../components/common/Text';
import useChat from './useChat';
import { handleCopyText } from '../../utils/functions';

const UserMessage = ({ index, message,confirmEditMessage, deleteMessageHandler,isFirstMessage, showNextMessage, showPreviousMessage, setEditIndex, siblings, editIndex, handleCancel, handleEdit }: any) => {
  const theme = useTheme();
  const [editMessage, setEditMessage] = useState(message?.content);
  return (
    <Fragment>
      {editIndex === index ? (
        <Box
          p={1}
          mb={1}
          maxWidth={"100%"}
          width={"100%"}
          marginLeft={"auto"}
          sx={{
            padding: "0.75rem 1.25rem",
            borderRadius: "1.25rem",
            backgroundColor: theme.palette.grey[200],
          }}
        >
          <TextField
            name='editMessage'
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            variant="outlined"
            placeholder="Feel free to add specific details"
            fullWidth
            autoFocus
            multiline
            rows={2}
            onFocus={(event) => {
              const input = event.target;
              const length = input.value.length;
              input.setSelectionRange(length, length);
            }}

            sx={{
              marginY: '1rem',
              '& .MuiInputBase-root': {
                padding: '0 !important',
                '& textarea': {
                  resize: 'none',
                  fontFamily: 'system-ui',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  fontWeight: '400',
                }
              },
              '& :focus': {
                borderColor: 'inherit !important'
              },
              '& fieldset': {
                border: 'none'
              },
              '& :hover': {
                borderColor: 'inherit !important'
              }
            }}
          />
          <Stack direction={'row'} justifyContent={'end'} gap={1}>
            <UniversalButton
              label={"Cancel"}
              width={"fit-content"}
              fontSize={"medium"}
              textColor="grey.900"
              onClick={() => {
                handleCancel();
              }}
              sx={{
                fontWeight: "500",
                backgroundColor: "common.white",
                border: "none ",
                borderRadius: "10rem",
                padding: "0.75rem 1rem",
                lineHeight: "1",
                "&:hover": {
                  backgroundColor: 'grey.300',
                },
              }}
            />
            <UniversalButton
              onClick={() => {
                setEditIndex(null);
                confirmEditMessage(message?.id, editMessage)
              }}
              label={"Send"}
              width={"fit-content"}
              fontSize={"medium"}
              textColor="common.white"
              sx={{
                fontWeight: "500",
                backgroundColor: "common.black",
                border: "none ",
                borderRadius: "10rem",
                padding: "0.75rem 1rem",
                lineHeight: "1",
                "&:hover": {
                  backgroundColor: 'common.black',
                },
              }}
            />
          </Stack>
        </Box>
      ) : (
        (message?.role === 'user') &&
        (<div id="question-div">
          <Box
            p={1}
            mb={1}
            maxWidth={"90%"}
            width={"fit-content"}
            marginLeft={"auto"}
            sx={{
              padding: "0.5rem 1.25rem",
              borderRadius: "1.25rem",
              backgroundColor: theme.palette.grey[200],
            }}
          >
            <Box
              sx={{
                fontSize: '1rem',
                width: '100%',
                maxWidth: '100%',
                color: 'inherit',
                '& p': { margin: 0 },
                '& img': { margin: '4px 0' },
                '& h1, h2, h3, h4, h5, h6': { margin: '4px 0' },
                '& pre': { margin: 0 },
                '& table': { margin: 0 },
                '& blockquote': { margin: 0 },
                '& ul': { marginTop: '-8px' },
                '& ol': { marginTop: '-8px' },
                '& li': { marginTop: '-12px' },
                whiteSpace: 'pre-wrap',
              }}

            >
              {message.content}
            </Box>
          </Box>

          {/* copy Buttons */}
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={1}
            className="copy-buttons"
          >

            <Tooltip title='Copy'>
              <IconButton
             onClick={()=> handleCopyText(message?.content) }
                sx={{
                  padding: '0.2rem !important',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: theme.palette.grey[600]
                  }
                }}>
                <Icon fontSize="small">
                  <CopyAllOutlined />
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton onClick={() => handleEdit(index)}>
                <Icon fontSize="small">
                  <EditOutlined />
                </Icon>
              </IconButton>
            </Tooltip>
            {!isFirstMessage && <Tooltip title='Delete'>
              <IconButton onClick={() => deleteMessageHandler(message?.id)}>
                <Icon fontSize="small">
                   <DeleteOutline />
                </Icon>
              </IconButton>
              </Tooltip>}

            {siblings?.length > 1 &&
              <Stack direction={'row'} alignItems={'center'} visibility={'visible'}>
                <IconButton onClick={() => showPreviousMessage(message)} id='index'>
                  <Icon fontSize='small'>
                    <KeyboardArrowLeft />
                  </Icon >
                </IconButton>

                <Text fontSize='.875rem' fontWeight='600'
                  sx={{
                    letterSpacing: '.1em'
                  }}>
                  {siblings.indexOf(message?.id) + 1}/{siblings.length}
                </Text>
                <IconButton onClick={() => showNextMessage(message)}>
                  <Icon fontSize='small'>
                    <KeyboardArrowRight />
                  </Icon>
                </IconButton>
              </Stack >}
          </Box>
        </div>)
      )}
    </Fragment>
  );
};

export default UserMessage;