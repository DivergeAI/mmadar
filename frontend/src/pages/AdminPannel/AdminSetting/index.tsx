import { Assignment, Cloud, Group, Image, Language, Monitor, Settings, Storage, VolumeUp } from '@mui/icons-material';
import { Box, Grid, Icon, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AdminSetting = () => {
    const [tab, setTab] = React.useState(0);

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


    ]
    return (


        <Grid container columnSpacing={1} sx={{
            height: '100%',
            overflow: 'auto',
            padding: '10px',

            p: 2,

            boxSizing: 'border-box',
            flexGrow: 1,
        }}>
            {/* Left */}
            <Grid item xs={12} md={2} >
                <Box>
                    <Tabs
                        value={tab}
                        onChange={(_, newValue) => setTab(newValue)}
                        orientation="vertical"
                        sx={{
                            
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            },
                            
                            '& .MuiTabs-flexContainer': {
                                alignItems: 'flex-start'
                            },
                            '& .MuiTab-root': {
                                fontSize: '0.875rem',
                                color :'common.black',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignSelf: 'center !important',
                                minHeight: '0 !important',
                                textTransform: 'capitalize',
                                width: '100%',
                                '&:hover': {
                                    borderRadius: '8px',
                                    backgroundColor: 'grey.200',
                                },
                                '&:focus': {
                                    outline: 'none'
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'grey.400',
                                    borderRadius: '8px',
                                    '& .MuiTab-wrapper': {
                                        color: 'common.black'
                                    }
                            
                                }
                            }
                        }}

                    >
                        {TABS.map((tab, index) => (
                            <Tab key={index} label={tab.label} icon={<Icon fontSize='small'>
                                {tab.icon}
                            </Icon>} iconPosition='start' sx={{
                                '&..MuiTab-icon	': {
                                    width: '16px',
                                }
                            }} />
                        )
                        )}
                    </Tabs>
                </Box>
            </Grid>

            {/* Right */}
            <Grid item xs={12} md={10} height={'100%'} sx={{
                overflowY: 'auto', // Only this section should be scrollable
            }}>
                <TabPanel value={tab} index={0}>
                    General
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    User
                </TabPanel>
            </Grid>
        </Grid>
    );
};

export default AdminSetting;
