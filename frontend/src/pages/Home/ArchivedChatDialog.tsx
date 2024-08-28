import React from 'react';
import CustomDialog from '../../components/common/CustomDialog';
import { DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, TextField } from '@mui/material';
import Text from '../../components/common/Text';
import { Close, Search } from '@mui/icons-material';

type ArchivedChatDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};


function ArchivedChatDialog({isOpen, onClose} :ArchivedChatDialogProps) {
    return (
        <CustomDialog
        open = {isOpen}
        close={onClose}
        >
              <DialogTitle
        >
            <Text fontSize="1.12rem" fontWeight="500">Archived Chats</Text>
            <IconButton onClick={onClose} sx={{ position: "absolute", right: "1%", top: "1%" }}>
                <Icon>
                    <Close />
                </Icon>
            </IconButton>
        </DialogTitle>

        <DialogContent
        sx={{
            my: '1rem',
        }}>

            <TextField 
            placeholder='Search'
            fullWidth
            variant='outlined'
            sx={{
                '& fieldset': {
                    border: 'none',
                
                }
            }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                        <Icon fontSize="small">
                          <Search />
                        </Icon>
                  </InputAdornment>
                )
            }}
            />

            <Divider sx={{ margin: "1% 0" }} />

            {/* Add your content here */}
            <Text fontSize='16px' fontWeight='500'>
            You have no archived conversations.            </Text>
            </DialogContent>
      
        </CustomDialog>
    );
}

export default ArchivedChatDialog;