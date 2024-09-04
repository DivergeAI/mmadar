import { Assignment, Cloud, Group, Image, Language, Monitor, Settings, Storage, VolumeUp } from '@mui/icons-material';
import { Box, Grid, Icon, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import GeneralSettings from './GeneralSettingsAdmin';
import UserSetting from './UserSettingAdmin';
import Connections from './ConnectionsSettingAdmin';
import ModelsSettingAdmin from './ModelsSettingAdmin';
import DocumentsSettingAdmin from './DocumentsSettingAdmin';
import WebSearchSettingAdmin from './WebSearchSetting';
import InterfaceSettingAdmin from './InterfaceSettingAdmin';
import AudioSettingAdmin from './AudioSettingAdmin';
import ImagesSettingAdmin from './ImagesSettingAdmin';
import PipelinesSettingAdmin from './PipelinesSettingAdmin';
import DatabaseSettingAdmin from './DatabaseSettingAdmin';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
height={'100%'}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box height={'100%'}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

const AdminSetting = () => {
    const [tab, setTab] = React.useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const TABS = [
        { label: 'General', icon: <Settings /> },
        { label: 'Users', icon: <Group /> },
        { label: 'Connections', icon: <Cloud /> },
        { label: 'Models', icon: '' },
        { label: 'Documents', icon: <Assignment /> },
        { label: 'Web Search', icon: <Language /> },
        { label: 'Interface', icon: <Monitor /> },
        { label: 'Audio', icon: <VolumeUp /> },
        { label: 'Images', icon: <Image /> },
        { label: 'Pipelines', icon: '' },
        { label: 'Database', icon: <Storage /> },
    ];

    return (
        <Grid 
            container 
            columnSpacing={2} 
            sx={{ height: '100%', overflow: 'auto', padding: '10px', p: 2, boxSizing: 'border-box', flexGrow: 1 }}
        >
            {/* Left */}
            <Grid 
                item 
                xs={12} 
                md={2.5} 
                sx={{
                    display: 'flex',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start',
                    // overflowX: isSmallScreen ? 'auto' : 'visible',
                    '& .MuiGrid-root': {
                        width: '100% !important',
                    }
                }}
            >
                    <Tabs
                        value={tab}
                        onChange={(_, newValue) => setTab(newValue)}
                        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
                        variant={isSmallScreen ? 'scrollable' :'standard'}
                        sx={{
                            width: '100%',
                            '& .MuiTabs-indicator': { display: 'none' },
                            '& .MuiTabs-flexContainer': {
                                gap: '0.3rem',
                                alignItems: isSmallScreen ? 'center' : 'flex-start',
                                flexDirection: isSmallScreen ? 'row' : 'column',
                            },
                            '& .MuiTab-root': {
                                fontSize: '0.75rem',
                                color: 'common.black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isSmallScreen ? 'center' : 'flex-start',
                                minHeight: '0 !important',
                                textTransform: 'capitalize',
                                width: isSmallScreen ? 'fit-content' : '100%',
                                '&:hover': {
                                    borderRadius: '8px',
                                    backgroundColor: 'grey.200',
                                },
                                '&:focus': {
                                    outline: 'none'
                                },
                                '&.Mui-selected': {
                                    color: 'common.black',
                                    backgroundColor: 'grey.400',
                                    borderRadius: '8px',
                                },
                            },
                            '& .MuiTabScrollButton-root': {
                                display: 'none !important',
                            }
                        }}
                    >
                        {TABS.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                icon={<Icon fontSize='small'>{tab.icon}</Icon>}
                                iconPosition='start'
                                sx={{
                                    '& .MuiTab-icon': {
                                        mr: 1,
                                        width: '1rem',
                                        height: '1rem',
                                    }
                                }}
                            />
                        ))}
                    </Tabs>
                
            </Grid>

            {/* Right */}
            <Grid 
                item 
                xs={12} 
                md={9.5} 
                height={'100%'} 
                sx={{ overflowY: 'auto' }}
            >
                <TabPanel value={tab} index={0}>
                <GeneralSettings />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UserSetting />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <Connections />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <ModelsSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    <DocumentsSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={5}>
                <WebSearchSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={6}>
                    <InterfaceSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={7}>
                    <AudioSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={8}>
                    <ImagesSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={9}>
                    <PipelinesSettingAdmin />
                </TabPanel>
                <TabPanel value={tab} index={10}>
                    <DatabaseSettingAdmin />
                </TabPanel>
            </Grid>
        </Grid>
    );
};

export default AdminSetting;
