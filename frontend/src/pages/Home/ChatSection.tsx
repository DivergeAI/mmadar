import { CopyAllOutlined, EditOutlined } from "@mui/icons-material";
import { Avatar, Box, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import Text from "../../components/common/Text";
import AnswerControls from "./AnswerControls";
import UniversalButton from "../../components/common/UniversalButton";

function ChatSection() {
  const theme = useTheme();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      {/* Question */}
      {[...Array(3).keys()].map((item, index) => (
        <Fragment key={index}>
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
                    border : 'none'
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
                  onClick={handleCancelClick}
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
            <div id="question-div">
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
                <pre>
                  What are 5 creative things I could do with my kids' art? I don't want to throw them away, but it's also so much clutter.
                </pre>
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
                  <IconButton onClick={() => handleEditClick(index)}>
                    <Icon fontSize="small">
                      <EditOutlined />
                    </Icon>
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
          )}

          {/* Answer */}
          <div id='answerBlock'>
            <Box display={"flex"} alignItems={"start"} gap={2} id='answer-div'>
              <Avatar />
              <Box display='flex' flexDirection='column' width={'100%'} gap={1}>
                {/* model name & time (when hover) */}
                <Box display={'flex'} gap={1} alignItems={'center'}>
                  <Text fontSize="14px" fontWeight="600">Model Name</Text>
                  <Text
                    fontSize="0.75rem"
                    fontWeight="500"
                    color={theme.palette.grey[500]}
                    sx={{
                      textTransform: 'uppercase'
                    }}
                    props={{
                      className: 'time-text'
                    }}
                  >11:01Am</Text>
                </Box>
                {/* answer */}
                <Box
                  p={1}
                  mb={1}
                  width='100%'
                  sx={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "1rem",
                    backgroundColor: theme.palette.grey[200],
                  }}
                >
                  <pre>
                    What are 5 creative things I could do with my kids' art? I don't want to throw them away, but it's also so much clutter.
                  </pre>
                </Box>

                {/* controls */}
                <AnswerControls />
              </Box>
            </Box>
          </div>
        </Fragment>
      ))}
    </Box>
  );
}

export default ChatSection;
