import { Box, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import { NavLink } from 'react-router-dom';

const Admin = () => {
    const WorkspaceRoute = [
        {
            to: '',
            label: 'Dashboard'
        },
        {
            to: 'settings',
            label: 'Settings'
        },
       

    ]
    const theme = useTheme()
    return (
        <Stack direction={'column'} spacing={1} 
        >
            <Box px={4} pt={3}>
                <Text fontSize='1.24rem' fontWeight='600'>
                    Admin Pannel
                </Text>
            </Box>

            {/* Custom Navigation using Box */}
            <Box
                px={4}
                pb={1}>
                <Box
                    display={'flex'}
                    p={0.5}
                    borderRadius={3}
                    width={'fit-content'}
                    sx={{
                        backgroundColor: theme.palette.background.main,
                    }}>
                    {WorkspaceRoute.map((route, index) => (
                        <NavLink
                        key={route.to}
                            to={route.to}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                backgroundColor: isActive ? theme.palette.background.paper : 'transparent',
                                color: theme.palette.common.black,
                                padding: '.375rem .75rem',
                            })}
                        >
                            {route.label}
                        </NavLink>
                    ))}


                </Box>
            </Box>

<Divider />
            {/* Render nested routes here */}
            {/* <Box 
            display={'flex'}
            flexDirection={'column'}
            flex={1}
            gap={2}
            maxHeight={'100%'}
            overflow={'auto'}
            px={4} pt={1.5}>
                <Outlet />
            </Box> */}
        </Stack>
    );
};

export default Admin;