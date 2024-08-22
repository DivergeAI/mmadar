import { Box } from '@mui/material';
import Sidebar, { drawerWidth } from '../components/common/Sidebar';

function Layout() {
    return (
        <Box sx={{display:'flex', width : '100vw', height : '100vh'}}>
            <Sidebar />
          <Box
          component={'main'}
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
               Content

          </Box>
        </Box>
    );
}

export default Layout;