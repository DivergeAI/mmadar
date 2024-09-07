import { Dialog, DialogContent, DialogTitle, Grid, Icon, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import Text from "../common/Text";
import { Group, Settings } from "@mui/icons-material";
import { useState } from "react";
import GeneralSetting from "./GeneralSetting";

const SettingsModal = ({open, onClose}:any) => {
    const theme = useTheme();
    const [tab, setTab] = useState(0);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const TABS = [
        { label: 'General', icon: <Settings /> },
        { label: 'Users', icon: <Group /> },
       
    ];

    return (
        <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        PaperProps={{
            sx:{
                margin : '1rem',
                maxWidth :'48rem !important',
                maxHeight :'60% !important',
                width: '100% !important',
                height: '100%',
                backgroundColor: theme.palette.grey[200],
            }
        }}
        >
            <DialogTitle>
                <Text>
                Settings
                    </Text>
            </DialogTitle>
            <DialogContent sx={{
                height :'100%'
            }}>
            <Grid 
            container 
            columnSpacing={2} 
            sx={{ height: '100%' }}
        >
            {/* Left */}
            <Grid 
                item 
                xs={12} 
                lg={3} 
                sx={{
                    display: 'flex',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start',
                    // height: '100%',
                    boxSizing: 'border-box',

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
                lg={9} 
                height={'100%'} 
                sx={{ overflowY: 'auto' }}
            >

              {tab === 0 && <GeneralSetting />}
                                
                        </Grid>

               

        </Grid>
            </DialogContent>

        </Dialog>
    );
};

export default SettingsModal;