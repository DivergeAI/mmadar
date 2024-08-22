import { Box } from '@mui/material';
import Sidebar, { drawerWidth } from '../components/common/Sidebar';
import Home from './Home';

function Layout() {
    return (
        <Box sx={{display:'flex', width : '100vw', height : '100vh'}}>
            <Sidebar />
          <Box
          component={'main'}
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } ,
          height : '100vh',
        boxSizing : 'border-box'}}
            >
<Home />
          </Box>
        </Box>
    );
}

export default Layout;