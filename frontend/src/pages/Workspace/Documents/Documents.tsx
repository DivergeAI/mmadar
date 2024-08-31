import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../../components/common/Text';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import { Add, Close, Search } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';
import CreateButtonLink from '../../../components/Workspace/CreateButtonLink';
import AddTags from '../../../components/common/AddTags';

const Documents = () => {
        const theme =useTheme();
    const navigate = useNavigate()
    const [tags, setTags] = useState<string[]>([])
    

const [addDoc, setAddDoc] = useState<boolean>(false)
    return (
        <Fragment>
        {/* Title */}
        <Text fontSize="1.12rem" fontWeight="600">
                  Documents
                </Text>
      
                {/* Search */}
      
                <Box 
                mb={0}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Search documents"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <Icon fontSize="small">
                              <Search />
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" >
                          <IconButton
                          onClick={() => setAddDoc(true)}
                            sx={{
                              border: `1px solid ${theme.palette.grey[400]}`,
                              borderRadius: 3,
                              "&:hover": {
                                backgroundColor: theme.palette.grey[300],
                                borderColor: theme.palette.grey[400],
                              },
                            }}
                          >
                            <Icon fontSize="small">
                              <Add />
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        border: "none !important",
                        padding: 0,
                      },
                      "& fieldset": {
                        border: "0",
                      },
                    }}
                  />
                            <Divider sx={{
                              mt: '.5rem'
                            }}/>     
      
                </Box>
      
                {/* Import & Export Button */}
                <Stack direction="row" gap={1} justifyContent={"end"}>
                  <UniversalButton
                    label={"Import Documents Mapping"}
                    width={"fit-content"}
                    height={"fit-content"}
                    fontSize={"small"}
                    textColor="common.black"
                    sx={{
                      fontWeight: "500",
                      backgroundColor: "background.paper",
                      border: "none ",
                      borderRadius: ".75rem",
                      padding: "0.375rem .75rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: theme.palette.grey[400],
                      },
                    }}
                    // startIcon  = {<Icon>
                    //     <ImportExport />
                    // </Icon> }
                  />
                  <UniversalButton
                    label={"Export Documents Mapping"}
                    width={"fit-content"}
                    height={"fit-content"}
                    fontSize={".75rem"}
                    textColor="common.black"
                    sx={{
                      fontWeight: "500",
                      backgroundColor: "background.paper",
                      border: "none ",
                      borderRadius: ".75rem",
                      padding: "0.375rem .75rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: theme.palette.grey[400],
                      },
                    }}
                    // startIcon  = {<Icon>
                    //     <ImportExport />
                    // </Icon> }
                  />
                </Stack>
      
      <Dialog
      open ={addDoc}
        onClose = {() => setAddDoc(false)}
sx={{
    '& .MuiDialog-paper': {
        width : '30rem !important',
        maxWidth : '100% !important',
    }
}}
      >
<DialogTitle display={'flex'} justifyContent={'space-between'}>
    <Text fontSize="1.12rem" fontWeight="500">Add Docs</Text>
    <IconButton onClick={() => setAddDoc(false)}>
        <Icon>
            <Close />
        </Icon>
        </IconButton>
</DialogTitle>

<DialogContent sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
}}>

<UniversalButton
                    label={"Click here to select documents."}
                    width={"100%"}
                    fontSize={".875rem"}
                    textColor="common.black"
                    sx={{
                      fontWeight: "500",
                      backgroundColor: "grey.400",
                      border: "none ",
                      borderRadius: ".75rem",
                      padding: "1rem .75rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: theme.palette.grey[500],
                      },
                    }}
                    // startIcon  = {<Icon>
                    //     <ImportExport />
                    // </Icon> }
                  />
                  <AddTags tags={tags} setTags={setTags} />
</DialogContent>
<DialogActions >
    <UniversalButton
                    label={"Save"}
                    width={"fit-content"}
                    // height={"fit-content"}
                    fontSize={"medium"}
                    textColor="common.white"
                    sx={{
                        m: '1rem',
                      fontWeight: "500",
                      backgroundColor: "success.main",
                      border: "none ",
                      
                      borderRadius: ".5em",
                      padding: "0.75rem 1rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: 'success.dark',
                      },
                    }}
                    // startIcon  = {<Icon>
                    //     <ImportExport />
                    // </Icon> }
                  />
</DialogActions>
      </Dialog>
   
                   </Fragment>
    );
};

export default Documents;