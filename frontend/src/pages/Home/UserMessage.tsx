import { Box, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import UniversalButton from '../../components/common/UniversalButton';
import { CopyAllOutlined, EditOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Text from '../../components/common/Text';

const UserMessage = ({index,message, history, activeIndex,setActiveIndex, siblings ,editIndex,handleCancel, handleEdit}:any) => {
    const theme =useTheme ();


const handleNextMessage = () => {
    const currentIndex = siblings.indexOf(activeIndex);
    if (currentIndex < siblings.length - 1) {
        setActiveIndex(siblings[currentIndex + 1]);
    }
}

const handlePrevMessage = () => {
    const currentIndex = siblings.indexOf(activeIndex);
    if (currentIndex > 0) {
        setActiveIndex(siblings[currentIndex - 1]);
    }
}

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
                value="What are 5 creative things I could do with my kids' art? I don't want to throw them away, but it's also so much clutter."
                variant="outlined"
                placeholder="Feel free to add specific details"
                fullWidth
                autoFocus
                multiline
                rows={2}
                maxRows={2}
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
                  onClick={handleCancel}
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
           (message?.role === 'user'  ) &&
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
                <div dangerouslySetInnerHTML={{ __html: message?.content }} />
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

                {siblings?.length > 1 && <Stack direction={'row'} alignItems={'center'} visibility={'visible'}>
                  <IconButton onClick={handlePrevMessage}>
                    <Icon fontSize='small'>
                      <KeyboardArrowLeft />
                    </Icon >
                  </IconButton>

                  <Text fontSize='.875rem' fontWeight='600'
                    sx={{
                      letterSpacing: '.1em'
                    }}>
                   {siblings.indexOf(activeIndex) + 1}/{siblings.length}
                  </Text>
                  <IconButton onClick={handleNextMessage}>
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