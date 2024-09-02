import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import Text from '../../../components/common/Text';
import { Add, Close, Edit } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import UniversalButton from '../../../components/common/UniversalButton';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    renderCell: (params) => (
      <Stack alignItems="start" justifyContent={'center'} width={'100%'} height={'100%'}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          width: 'fit-content',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          padding: '0.125rem .75rem',
        }}>
          <Box sx={{
            width: '0.25rem',
            height: '0.25rem',
            borderRadius: '50%',
            backgroundColor: 'success.main',
            marginRight: '0.25rem',
          }}>
          </Box>
          <Text fontSize='0.75rem' fontWeight='500' sx={{
            textTransform: 'lowercase',
            color: 'success.main',
          }}>
            {params.value}
          </Text>
        </Box>
      </Stack>
    )
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    renderCell: (params) => (
        <Stack direction={'row'} alignItems="center" justifyContent={'start'} width={'100%'} height={'100%'} gap={1}>
            <Avatar sx={{ width: '1.5rem', height: '1.5rem' }} />
            <Text fontSize='0.75rem' fontWeight='600'>
            {params.value}
            </Text>
        </Stack>
    )
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: false,
    flex: 1,
  },
  {
    field: 'oAuthID',
    headerName: 'OAUTHID',
    type: 'number',
    flex: 1,
  },
  {
    field: 'lastActive',
    headerName: 'Last Active',
    type: 'string',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    type: 'string',
    flex: 1,
  },
  {
    field: '',
    headerName: '',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} justifyContent={'end'} alignItems={'center'} width={'100%'} height={'100%'}>
        <Tooltip title="Edit">
          <IconButton>
            <Icon fontSize='small'>
              <Edit />
            </Icon>
          </IconButton>
        </Tooltip>
        {/* Add more buttons here if needed */}
      </Stack>
    ),
  },
];

const rows = [
  { id: 1, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
  // Add more rows here
];

const AdminDashboard = () => {
    const[isAddUser,setIsAddUser] = useState<boolean>(false);
    const [userFormTab  , setUserFormTab] = useState<string>('Form');
  const theme = useTheme();

  return (
    <Box px={4} py={2}>
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
        {/* title */}
        <Stack direction={'row'} gap={1}>
          <Text fontSize='1.12rem' fontWeight='500' sx={{ lineHeight: '1.75rem' }}>
            All User
          </Text>

          <Divider orientation='vertical' flexItem />
          <Text fontSize='1.12rem' fontWeight='500' color='grey.700' sx={{ lineHeight: '1.75rem' }}>
            1
          </Text>
        </Stack>
        {/* search & add user Button */}
        <Stack direction='row' gap={2} alignItems={'center'}>
          <TextField
            variant="outlined"
            placeholder="Search"
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none !important",
              },
              "& fieldset": {
                border: "none !important",
              },
            }}
          />
          <Tooltip title='Add User'>
            <IconButton
            onClick={() => setIsAddUser(true)}
            sx={{
              border: `1px solid ${theme.palette.grey[300]}`,
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'grey.400',
                border: `1px solid ${theme.palette.grey[300]}`,
              },
            }}>
              <Icon fontSize='medium'>
                <Add />
              </Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* User Data Table */}
      <Box sx={{ height: 'fit-content', width: '100%' }} mt={2}>
        <DataGrid
        disableColumnMenu
        // hideFooterSelectedRowCount
        // hideFooterPagination
          rows={rows}
          columns={columns}         
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          hideFooter
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeader': {
              fontWeight: '600 !important',
              height: '2.5rem !important',
              backgroundColor: theme.palette.grey[300],
              border: 'none !important',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: '600 !important',
                color: 'grey.600 !important',
              },
              '&:focus': {
                outline: 'none !important',
              },
            },
            '& .MuiDataGrid-row': {
              height: '3.5rem !important',
              minHeight: '2.5rem !important',
              border: 'none !important',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&:last-child': {
                // borderBottom: 'none !important',
              }
            },
            '& .MuiDataGrid-cell': {
            //   lineHeight: '2.5rem !important',
            //   height: '2.5rem !important',
              borderBottom: `1px solid ${theme.palette.grey[600]}`,

              fontSize: '12px',
              color: 'text.secondary', // or any other color you want
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&:focus': {
                outline: 'none !important',
              },
            },
          }}
        />
      </Box>

      <Dialog
      sx={{
        '& .MuiDialog-paper': {
            width : '30rem !important',
            maxWidth : '100% !important',
        }
    }}
      open = {isAddUser}
        onClose = {() => setIsAddUser(false)} 
      >

<DialogTitle display={'flex'} justifyContent={'space-between'}>
    <Text fontSize="1.12rem" fontWeight="500">Add User</Text>
    <IconButton onClick={() => setIsAddUser(false)}>
        <Icon>
            <Close/>
        </Icon>
        </IconButton>
</DialogTitle>
<DialogContent>
    <Stack gap={1.5}>
    <Box px={4} pb={1} width={'100%'}>
                <Box width={'100%'}
                    display={'flex'}
                    p={0.5}
                    borderRadius={3}
                    sx={{
                        backgroundColor: theme.palette.background.main,
                    }}>
                    {['Form' , 'CSV Import'].map((route) => (
                      <UniversalButton
                        label={route}
                        sx={{
                            width : '100%',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor:  theme.palette.background.paper ,
                        color: theme.palette.common.black,
                        padding: '.375rem .75rem',
                        '&:hover': {
                            backgroundColor: theme.palette.background.paper,
                        }
                        }} />
                    ))}
                </Box>
            </Box>

        
    <TextFieldContainer label ='Name'>
        <TextField 
        type='text'
        variant='outlined' 
        placeholder='Enter Your Full Name'
        fullWidth
        sx={{
            '& .MuiOutlinedInput-root': {
                backgroundColor: 'common.white',
                borderRadius : '.5rem',
            },
            '& fieldset': {
                border: 'none !important',
            },
        }}
        />
    </TextFieldContainer>
        <Divider /> 

        <TextFieldContainer label ='Email'>
        <TextField 
        type='email'
        variant='outlined' 
        placeholder='Enter Your Email '
        fullWidth
        sx={{
            '& .MuiOutlinedInput-root': {
                backgroundColor: 'common.white',
                borderRadius : '.5rem',
            },
            '& fieldset': {
                border: 'none !important',
            },
        }}
        />
    </TextFieldContainer>

    <TextFieldContainer label ='Password'>
        <TextField 
        type='password'
        variant='outlined' 
        placeholder='Enter Your Password'
        fullWidth
        sx={{
            '& .MuiOutlinedInput-root': {
                backgroundColor: 'common.white',
                borderRadius : '.5rem',
            },
            '& fieldset': {
                border: 'none !important',
            },
        }}
        />
    </TextFieldContainer>
    </Stack>

</DialogContent>

<DialogActions >
<UniversalButton
                    label={"Save"}
                    width={"fit-content"}
                    // height={"fit-content"}
                    fontSize={"medium"}
                    textColor="common.white"
                    sx={{
                        m: ' 0 1rem',
                      fontWeight: "500",
                      backgroundColor: "success.dark",
                      border: "none ",
                      
                      borderRadius: ".5em",
                      padding: "0.75rem 1rem",
                      lineHeight: "1",
                      "&:hover": {
                        backgroundColor: 'success.dark',
                      },
                    }}
                    
                  />
</DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
