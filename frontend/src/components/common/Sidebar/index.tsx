import { Box,useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../../theme/ThemeProvider';
import PermenentSidebar from './PermenentSidebar';
import TemporarilySidebar from './TemporarilySidebar';

export const drawerWidth = 270;


function Sidebar() {
    const theme = useTheme();
// states

    return (
        <Box 
        component={'nav'}
        sx={{
            width : {md: drawerWidth},
            flexShrink: {sm: 0},
        }}
        >
            {/* Temporary Drawer  */}
         <TemporarilySidebar />

        {/* Permanent Drawer */}
<PermenentSidebar />
      
        </Box>
    );
}

export default Sidebar;