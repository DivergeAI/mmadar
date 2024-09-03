import { Box, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import Text from '../../components/common/Text';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
    const WorkspaceRoute = [
        {
            to: '/admin',
            label: 'Dashboard'
        },
        {
            to: '/admin/settings',
            label: 'Settings'
        },
    ];

    const theme = useTheme();
    const location = useLocation();

    return (
        <Stack direction={'column'} spacing={1} width={'100%'} height={'100vh'} >
            <Box px={4} pt={3}>
                <Text fontSize='1.24rem' fontWeight='600'>
                    Admin Panel
                </Text>
            </Box>

            {/* Custom Navigation using Box */}
            <Box px={4} pb={1}>
                <Box
                    display={'flex'}
                    p={0.5}
                    borderRadius={3}
                    width={'fit-content'}
                    sx={{
                        backgroundColor: theme.palette.background.main,
                    }}>
                    {WorkspaceRoute.map((route) => (
                        <NavLink
                            end
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

            {/* Conditionally render content only for Dashboard */}
            {location.pathname === '/admin' && (
                <AdminDashboard />
            )}

            {/* Outlet for rendering nested routes */}
                <Outlet />
        </Stack>
    );
};

export default Admin;
