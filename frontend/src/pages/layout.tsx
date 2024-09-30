import { Box } from '@mui/material';
import Sidebar, { drawerWidth } from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDocuments } from '../redux/slices/documents/thunk';
import { AppDispatch } from '../redux/store';

function Layout() {
  const dispatch:AppDispatch = useDispatch<AppDispatch>();


  useEffect(() => {dispatch(fetchAllDocuments())}, []);

  useEffect(() => {}, []);

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