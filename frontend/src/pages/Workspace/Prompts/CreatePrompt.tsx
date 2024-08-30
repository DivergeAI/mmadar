import { Box, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniversalButton from '../../../components/common/UniversalButton';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import Text from '../../../components/common/Text';

const CreatePrompt = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <Box>
            {/* back button */}
            <UniversalButton
                label="Back"
                variant="text"
                onClick={() => navigate(-1)}
                sx={{
                    padding: "0",
                    minWidth: "auto",
                    height: "auto",
                    fontSize: ".75rem",
                    fontWeight: "600",
                    lineHeight: "1rem",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "grey.800",
                    border: "none",
                }}
            />

            {/* Create Form */}
            <Stack
                direction={"column"}
                maxWidth={"42rem"}
                mx={"auto"}
                mt={4}
                mb={10}
                spacing={2}
            >
                <TextFieldContainer label='Title' required>
                    <TextField
                        variant='outlined'

                        fullWidth
                        placeholder='Add a short title for this prompt'
                        sx={{
                            '& :hover': {
                                borderColor: 'inherit !important'
                            }
                        }}
                    />
                </TextFieldContainer>

                <TextFieldContainer label='Command' required>
                    <Stack direction={'row'}
                        border={`1px solid ${theme.palette.grey[400]}`}
                        borderRadius={'.5rem'}>
                        <Box
                            sx={{
                                borderTopLeftRadius: '.5rem',
                                borderBottomLeftRadius: '.5rem',
                                padding: '.15rem .75rem',
                                backgroundColor: 'grey.400',
                                fontSize: '1.25rem',
                                fontWeight: '600'
                            }}>
                            /
                        </Box>
                        <TextField
                            variant='outlined'
                            fullWidth
                            placeholder='short-summary'

                            sx={{
                                '& .MuiInputBase-root': {
                                    paddingLeft: '0 !important'
                                },

                                '& fieldset': {
                                    border: 'none !important'
                                }

                            }}
                        />
                    </Stack>
                            <Text fontSize='small' color='grey.500'>
                            Only <b style={{
                                color: theme.palette.grey[700]
                            }}>alphanumeric characters and hyphens</b> are allowed - Activate this command by typing "/ "   to chat input.

                            </Text>
                </TextFieldContainer>

                <TextFieldContainer label='Prompt Content' required>

                    <TextField
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={7}
                        placeholder='Add a description for this prompt'
                        sx={{
                            '& .MuiInputBase-root':{
                                padding: '0 !important',
                                '& textarea': {
                                    padding: '1rem',
                                    resize : 'vertical',
                                    fontFamily : 'system-ui',
                                    fontSize :'.87rem',
                                    fontWeight : '400',
                                }
                            },
                            '& :focus': {
                               borderColor: 'inherit !important'
                            },
                            '& :hover': {
                                borderColor: 'inherit !important'
                            }
                        }}
/>
<Text fontSize='small' color='grey.500'>`
ⓘ Format your variables using square brackets like this: <b style={{
                                color: theme.palette.grey[900]
                            }}>[variable]</b>. Make sure to enclose them with <b style={{
                                color: theme.palette.grey[900]
                            }}>'['</b> and <b style={{
                                color: theme.palette.grey[900]
                            }}>']'</b>.
Utilize <b style={{
                                color: theme.palette.grey[900]
                            }}>{"{{CLIPBOARD}}"}</b> variable to have them replaced with clipboard content.`
                            </Text>

                </TextFieldContainer>

                <UniversalButton
              label={"Save & Create"}
              width={"fit-content"}
              height={"fit-content"}
              fontSize={"small"}
              textColor="common.black"
              sx={{
                alignSelf : 'flex-end',
                fontWeight: "600",
                backgroundColor: "background.paper",
                border: "none ",
                borderRadius: ".75rem",
                padding: "0.5rem .75rem",
                // lineHeight: "1",
                "&:hover": {
                  backgroundColor: theme.palette.grey[400],
                },
              }}
            />

            </Stack>
        </Box>
    );
};

export default CreatePrompt;