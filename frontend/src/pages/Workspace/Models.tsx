import { Box, Divider, Icon, IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import React, { Fragment } from 'react';
import Text from '../../components/common/Text';
import { Add, Search } from '@mui/icons-material';
import { useNavigate, useLocation, NavLink, Outlet } from 'react-router-dom';
import Model from '../../components/common/Model';

const Models = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the current path is the create page
    const isCreatePage = location.pathname === '/workspace/models/create';

    // Function to handle back button click
    const handleBackClick = () => {
        navigate('/workspace/models');
    };

    return (
        <Fragment>
            {!isCreatePage && (
                <>
                    {/* Title */}
                    <Text fontSize='1.12rem' fontWeight='600'>
                        Models
                    </Text>

                    {/* Search */}
                    <Box mb={1}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            placeholder='Search models'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IconButton>
                                            <Icon fontSize='small'>
                                                <Search />
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            sx={{
                                                border: `1px solid ${theme.palette.grey[400]}`,
                                                borderRadius: 3,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.grey[300],
                                                    borderColor: theme.palette.grey[400]
                                                }
                                            }}
                                        >
                                            <Icon fontSize='small'>
                                                <Add />
                                            </Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    border: 'none !important',
                                    padding: 0
                                },
                                '& fieldset': {
                                    border: '0'
                                }
                            }}
                        />
                    </Box>

                    <Divider />

                    {/* Create Model Button */}
                    <Box
                        display={'flex'}
                        gap={2}
                        mb={2}
                        component={NavLink}
                        to={'/workspace/models/create'}
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
                            <Text fontSize='1rem' fontWeight='600' color='common.black'>
                                Create a model
                            </Text>
                            <Text fontSize='0.875rem' fontWeight='400' color='common.black'>
                                Customize models for a specific purpose
                            </Text>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Models List */}
                    {[1].map((model, index) => (
                        <Model model={model}/>
                    ))}
                </>
            )}

            {/* Back Button (Only on Create Page) */}
            {isCreatePage && (
                <Box mb={2}>
                    <IconButton onClick={handleBackClick} sx={{ marginRight: 1 }}>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                    <Text fontSize='1rem' fontWeight='600'>
                        Back to Models
                    </Text>
                </Box>
            )}

            <Outlet />
        </Fragment>
    );
};

export default Models;
