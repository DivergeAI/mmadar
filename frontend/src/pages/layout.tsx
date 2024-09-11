import { Box } from '@mui/material';
import Sidebar, { drawerWidth } from '../components/common/Sidebar';
import Home from './Home';
import { Outlet, RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import { API_BASE_URL } from '../utils/constants';

function Layout() {

    return (
        <Box sx={{display: {sm:'flex'}, width : '100vw', height : '100vh'}}>
            <Sidebar />
          <Box
          component={'main'}
          sx={{ flexGrow: 1, 
            width: {sm: '100%', md: `calc(100% - ${drawerWidth}px)` } ,
          height : '100vh',
        boxSizing : 'border-box'}}
            >
          <Outlet />
          </Box>
        </Box>
    );
}

export default Layout;