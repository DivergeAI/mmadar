import { Avatar, Divider, Icon, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Text from '../common/Text';
import UniversalButton from '../common/UniversalButton';
import TextFieldContainer from '../common/TextFieldContainer';
import { ContentCopy, Edit, Refresh, Visibility } from '@mui/icons-material';
import { orange } from '@mui/material/colors';

const AccountSetting = () => {
    const theme = useTheme();
    const profileRef = React.useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    const [name, setName] = React.useState<string>("John Doe");
    const [showInitials, setShowInitials] = React.useState<boolean>(false);
    const [hovered, setHovered] = React.useState<boolean>(false);
const [isChangePassword, setIsChangePassword] = React.useState<boolean>(false);
    const [isChangeAPIKey, setIsChangeAPIKey] = React.useState<boolean>(false);

    const getInitials = (name: string) => {
        const names = name.split(" ");
        return names.map((n) => n[0]).join("").toUpperCase();
    };


    const handleChangeImageClick = () => {
        if (profileRef.current) {
            profileRef.current.click();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(file); // Store the file directly in state
            setShowInitials(false);
        }
    };

    return (
        <Stack height="100%">
            <Stack
                gap={1}
                height={"100%"}
                flex={"1 1 auto"}
                sx={{
                    overflowY: "auto",
                }}
            >
                {/* Avatar */}
                <Stack alignItems="center" direction={"row"} gap={2}>
                    <Stack
                        position="relative"
                        onMouseEnter={() => setHovered(true)} // Set hover state on enter
                        onMouseLeave={() => setHovered(false)} // Remove hover state on leave
                    >
                        <Avatar
                            sx={{
                                width: 60, height: 60,
                                backgroundColor: showInitials ? orange[400] : undefined,
                                color: 'common.white',
                            }}
                            onClick={handleChangeImageClick}
                            src={showInitials ? undefined : profileImage ? URL.createObjectURL(profileImage) : undefined} // Use the file to create URL
                        >

                            {showInitials ? getInitials(name) : undefined}
                        </Avatar>
                        {hovered && (
                            <IconButton
                                onClick={handleChangeImageClick}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    opacity: 0.9,
                                }}
                            >
                                <Icon fontSize='small'>

                                    <Edit fontSize="small" />
                                </Icon>
                            </IconButton>
                        )}
                    </Stack>



                    <Stack direction={"column"} alignItems="flex-start" gap={1}>
                        <Text fontWeight="500" fontSize=".87rem">
                            Profile Image
                        </Text>
                        <Stack direction="row" gap={1} alignItems="center">
                            <UniversalButton
                                onClick={() => {
                                    setProfileImage(null);
                                    setShowInitials(true); // Enable initials
                                }}

                                label="Use Initials"
                                backgroundColor="grey.300"
                                textColor="grey.900"
                                border="none"
                                size="small"
                                sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    letterSpacing: "0px",
                                    lineHeight: "1",
                                    bordeRadius: "5rem",
                                    padding: "0.25rem 1rem",
                                    "&:hover": {
                                        backgroundColor: "grey.300",
                                    },
                                }}
                            />
                            <UniversalButton
                                label="Use Gravatar"
                                backgroundColor="grey.300"
                                textColor="grey.900"
                                border="none"
                                size="small"
                                sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    letterSpacing: "0px",
                                    lineHeight: "1",
                                    bordeRadius: "5rem",
                                    padding: "0.25rem 1rem",
                                    "&:hover": {
                                        backgroundColor: "grey.300",
                                    },
                                }}
                            />
                            <UniversalButton
                                label="Remove"
                                backgroundColor="transparent"
                                textColor="grey.900"
                                border="none"
                                size="small"
                                sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    letterSpacing: "0px",
                                    lineHeight: "1",
                                    bordeRadius: "5rem",
                                    padding: "0.25rem .5rem",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                onClick={() => {
                                    setProfileImage(null);
                                    setShowInitials(false);
                                }}
                            />
                        </Stack>
                    </Stack>
                    <input
                        type="file"
                        accept="image/*"
                        ref={profileRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </Stack>



                {/* Name */}

                <TextFieldContainer label='Name'>
                    <TextField
                        type='text'
                        variant='outlined'
                        fullWidth
                        placeholder='Enter your name'
                        size='small'

                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'common.white',
                                borderRadius: '0.5rem',
                                '& fieldset': {
                                    border: 'none',

                                }
                            },
                        }}
                    />
                </TextFieldContainer>

                {/* Change Password */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontWeight='500' fontSize='.87rem'>
                        Change Password
                    </Text>
                    <UniversalButton
                    onClick={() => setIsChangePassword(!isChangePassword)}
                        label={isChangePassword ?  'Hide' : 'Show'}
                        backgroundColor='transparent'
                        textColor='grey.700'
                        border='none'
                        size='small'
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: '500 !important',
                            letterSpacing: '0px',
                            lineHeight: '1',
                            bordeRadius: '5rem',
                            padding: '0.25rem 1rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }}
                    />
                </Stack>

                {/* current password */}
             {isChangePassword &&    <Stack direction={'column'} gap={.5}>

                    <TextFieldContainer label='Current Password' sx={{
                        fontWeight: '400 !important',
                        fontSize: '.75rem !important',
                        color: theme.palette.grey[700],
                    }}>
                        <TextField
                            type='password'
                            variant='outlined'
                            fullWidth
                            placeholder=''
                            size='small'

                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'common.white',
                                    borderRadius: '0.25rem',
                                    '& fieldset': {
                                        border: 'none',

                                    }
                                },
                            }}
                        />
                    </TextFieldContainer>

                    {/* New Password */}
                    <TextFieldContainer label='New Password' sx={{
                        fontWeight: '400 !important',
                        fontSize: '.75rem !important',
                        color: theme.palette.grey[700],
                    }}>
                        <TextField
                            type='password'
                            variant='outlined'
                            fullWidth
                            placeholder=''
                            size='small'

                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'common.white',
                                    borderRadius: '0.25rem',
                                    '& fieldset': {
                                        border: 'none',

                                    }
                                },
                            }}
                        />
                    </TextFieldContainer>

                    {/* Confirm Password */}

                    <TextFieldContainer label='Current Password' sx={{
                        fontWeight: '400 !important',
                        fontSize: '.75rem !important',
                        color: theme.palette.grey[700],
                    }}>
                        <TextField
                            type='password'
                            variant='outlined'
                            fullWidth
                            placeholder=''
                            size='small'

                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'common.white',
                                    borderRadius: '0.25rem',
                                    '& fieldset': {
                                        border: 'none',

                                    }
                                },
                            }}
                        />
                    </TextFieldContainer>

                    <UniversalButton
                        label='Update Password'
                        backgroundColor='common.black'
                        textColor='common.white'
                        size='small'
                        border='none'
                        variant='outlined'
                        sx={{
                            mt: '1rem',
                            alignSelf: 'flex-end',
                            width: 'fit-content',
                            // borderRadius: '5rem',
                            padding: '0.25rem 1rem',
                            '&:hover': {
                                backgroundColor: 'common.black',
                            }
                        }}
                    />
                </Stack>}

                <Divider sx={{ my: 1 }} />
                {/* Change Password */}
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontWeight='500' fontSize='.87rem'>
                        API Keys    </Text>
                    <UniversalButton
                    onClick={() => setIsChangeAPIKey(!isChangeAPIKey)}
                        label={isChangeAPIKey ? 'Hide' :'Show'}
                        backgroundColor='transparent'
                        textColor='grey.700'
                        border='none'
                        size='small'
                        sx={{
                            fontSize: '0.75rem',
                            fontWeight: '500 !important',
                            letterSpacing: '0px',
                            lineHeight: '1',
                            bordeRadius: '5rem',
                            padding: '0.25rem 1rem',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }
                        }}
                    />
                </Stack>

                {/* Jwt Token */}
                {isChangeAPIKey && <Stack direction={'column'} gap={.5}>

                    <TextFieldContainer label='JWT Token' sx={{
                        fontWeight: '500 !important',
                        fontSize: '.75rem !important',
                        color: theme.palette.grey[900],
                    }}>
                        <TextField
                            value={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2MGY3NGRhLWNlNjAtNDc0NS05ZDk0LTg3NzAwMzI3YmIyNCJ9.ktVU7l0bkBbcBjxYfQpIZiYSCtWpLQG6fhLrL3WFtEo'}
                            type='password'
                            variant='outlined'
                            fullWidth
                            placeholder=''
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <Stack direction='row' gap={1}>
                                            <IconButton disableRipple sx={{
                                                padding: '0 !important',
                                                width: 'fit-content',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>
                                                <Icon fontSize='small'>
                                                    <Visibility sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                            <IconButton disableRipple sx={{
                                                padding: '0 !important',
                                                width: 'fit-content',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>
                                                <Icon fontSize='small'>
                                                    <ContentCopy sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                        </Stack>

                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'transparent',
                                    borderRadius: '0.25rem',
                                    '& fieldset': {
                                        border: 'none',

                                    }
                                },
                            }}
                        />
                    </TextFieldContainer>


                    {/* API key */}
                    <TextFieldContainer label='API Key' sx={{
                        fontWeight: '500 !important',
                        fontSize: '.75rem !important',
                        color: theme.palette.grey[900],
                    }}>
                        <TextField
                            value={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2MGY3NGRhLWNlNjAtNDc0NS05ZDk0LTg3NzAwMzI3YmIyNCJ9.ktVU7l0bkBbcBjxYfQpIZiYSCtWpLQG6fhLrL3WFtEo'}
                            type='password'
                            variant='outlined'
                            fullWidth
                            placeholder=''
                            size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <Stack direction='row' gap={1}>
                                            <IconButton disableRipple sx={{
                                                padding: '0 !important',
                                                width: 'fit-content',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>
                                                <Icon fontSize='small'>
                                                    <Visibility sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                            <IconButton disableRipple sx={{
                                                padding: '0 !important',
                                                width: 'fit-content',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>
                                                <Icon fontSize='small'>
                                                    <ContentCopy sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                            <IconButton disableRipple sx={{
                                                padding: '0 !important',
                                                width: 'fit-content',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>
                                                <Icon fontSize='small'>
                                                    <Refresh sx={{
                                                        width: '1rem',
                                                        height: '1rem',
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                        </Stack>

                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'transparent',
                                    borderRadius: '0.25rem',
                                    '& fieldset': {
                                        border: 'none',

                                    }
                                },
                            }}
                        />
                    </TextFieldContainer>
                </Stack>}
            </Stack>
            <UniversalButton
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    m: '1rem 0 0',
                    alignSelf: "flex-end",
                    fontWeight: "500",
                    backgroundColor: "success.dark",
                    border: "none",
                    borderRadius: ".5em",
                    padding: "0.75rem 1rem",
                    lineHeight: "1",
                    "&:hover": {
                        backgroundColor: "success.dark",
                    },
                }}
            />
        </Stack>
    );
};

export default AccountSetting;