import { Box, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import { drawerWidth } from ".";

function TemporarilySidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
const [isClosing, setIsClosing] = useState(false);

const handleDrawerClose = () => {
  setIsClosing(true);
  setMobileOpen(false);
};

const handleDrawerTransitionEnd = () => {
  setIsClosing(false);
};

const handleDrawerToggle = () => {
  if (!isClosing) {
    setMobileOpen(!mobileOpen);
  }
};

    return (
        <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}

sx={{
  display: {xs: 'block', sm: 'none'},
  '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth
  },
}}
>
  <Box
  width='100%'
  textAlign={'center'}
  role = 'presentation'
  boxSizing={'border-box'}>  
  <Typography variant='h5'>Sidebar</Typography>
  </Box>
</Drawer>
    );
}

export default TemporarilySidebar;