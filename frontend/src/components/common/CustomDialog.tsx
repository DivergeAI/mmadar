import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { DIALOGTYPES } from '../../types/Dialog';
import Text from './Text';
import { Close, Search } from '@mui/icons-material';



const CustomDialog = ({open, close,children}:DIALOGTYPES) => {
    return (
        <Dialog
        open={open}
        onClose={close}
        sx={{
          "& .MuiDialog-paper": {
            padding: "0%",
            borderRadius: "12px",
            maxWidth:
              "850px",
            maxHeight: "70vh",
            minHeight:'fit-content',
          },
        }}
      >
    {children}
      
      </Dialog>
    );
};

export default CustomDialog;