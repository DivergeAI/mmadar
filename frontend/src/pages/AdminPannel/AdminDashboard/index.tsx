import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, MenuItem, Select, Stack, TextField, Tooltip, useTheme } from '@mui/material';
import Text from '../../../components/common/Text';
import { Add, Close, Edit, KeyboardArrowDown } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRef, useState } from 'react';
import TextFieldContainer from '../../../components/common/TextFieldContainer';
import UniversalButton from '../../../components/common/UniversalButton';
import { orange } from '@mui/material/colors';



const AdminDashboard = () => {
    const theme = useTheme();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isAddUser, setIsAddUser] = useState<boolean>(false);
    const [userFormTab, setUserFormTab] = useState<string>('Form');
    const [isEditUser, setIsEditUser] = useState<boolean>(false);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            setFile(newFile);
}
}

    const handleUploadFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

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
                        <IconButton onClick={()=> setIsEditUser(true)}>
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
        { id: 2, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 3, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 4, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 5, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 6, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 7, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 8, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 9, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 10, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 11, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 12, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 13, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 14, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 15, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },
        { id: 16, role: 'Admin', name: 'Snow', email: 'Jon', oAuthID: '', lastActive: '12/12/2021', createdAt: '12/12/2021' },

        // Add more rows here
    ];
    return (
        <Box px={4} py={2} height={'100%'} sx={{
            overflowY: 'auto',
        }} >
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
            <Box sx={{ height: 'fit-content', width: '100%' ,maxHeight : '100%', overflowY : 'auto'}} mt={2}>
                <DataGrid
                    disableColumnMenu
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    hideFooter
                    pageSizeOptions={[5,10,20]}
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
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: `1px solid ${theme.palette.grey[600]}`,
                            fontSize: '12px',
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            '&:focus': {
                                outline: 'none !important',
                            },
                            '&:focus-within': {
                                outline: 'none !important',
                            }
                        },
                    }}
                />
            </Box>

            {/* Add User Dialog */}
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        width: '30rem !important',
                        maxWidth: '100% !important',
                    }
                }}
                open={isAddUser}
                onClose={() => setIsAddUser(false)}
            >
                <DialogTitle display={'flex'} justifyContent={'space-between'}>
                    <Text fontSize="1.12rem" fontWeight="500">Add User</Text>
                    <IconButton onClick={() => setIsAddUser(false)}>
                        <Icon>
                            <Close />
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack gap={1.5}>
                        <Box px={4} pb={1} width={'100%'}>
                            <Box
                                width={'100%'}
                                display={'flex'}
                                p={0.5}
                                borderRadius={3}
                                sx={{
                                    backgroundColor: theme.palette.background.main,
                                }}>
                                {['Form', 'CSV Import'].map((route) => (
                                    <UniversalButton
                                        key={route}
                                        label={route}
                                        onClick={() => setUserFormTab(route)}
                                        sx={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            backgroundColor: userFormTab === route ? theme.palette.common.white : 'transparent',
                                            color: theme.palette.common.black,
                                            border: 'none',
                                            padding: '.375rem .75rem',
                                            '&:hover': {
                                                backgroundColor: userFormTab === route ? theme.palette.common.white : 'transparent',
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {userFormTab === 'Form' && (
                            <>
                                <TextFieldContainer label='Role' sx={{
                                    fontSize : '.87rem !important',
                                }}>
                                    <Select
                                        defaultValue={'pending'}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {

                                                    // width: "30rem",
                                                    fontSize: ".87rem",
                                                    border: `1px solid #E0E0E0`,
                                                    boxShadow: "none",
                                                    height: "fit-content",
                                                    padding: "0",
                                                },
                                            },
                                            autoFocus: false,
                                            anchorOrigin: {
                                                vertical: "top",
                                                horizontal: "left",
                                            },
                                            transformOrigin: {
                                                vertical: "top",
                                                horizontal: "left",
                                            },
                                        }}
                                        size='small'
                                        variant='outlined'
                                        fullWidth
                                        IconComponent={KeyboardArrowDown}
                                        sx={{
                                            "& .MuiSelect-select": {
                                                textTransform: "capitalize",
                                                fontSize: ".87rem",
                                                backgroundColor: "common.white",
                                                border: 'none',
                                                borderRadius: ".5rem",
                                                whiteSpace: "nowrap",
                                            },
                                            '& fieldSet': {
                                                border: 'none !important',
                                            }
                                        }}
                                    >
                                        {['pending', 'admin', 'user'].map((option) => (
                                            <MenuItem key={option} value={option}
                                                sx={{
                                                    textTransform: "capitalize",
                                                    fontSize: ".87rem",
                                                    whiteSpace: "nowrap",
                                                    // padding: ".5rem 1rem",
                                                    // borderRadius: ".5rem",
                                                    '&:hover': {
                                                        backgroundColor: 'grey.300',
                                                    },
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}


                                    </Select>
                                </TextFieldContainer>
                                <TextFieldContainer label='Name'>
                                    <TextField
                                        type='text'
                                        variant='outlined'
                                        placeholder='Enter Your Full Name'
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>
                                <Divider />

                                <TextFieldContainer label='Email'>
                                    <TextField
                                        type='email'
                                        variant='outlined'
                                        placeholder='Enter Your Email '
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>

                                <TextFieldContainer label='Password'>
                                    <TextField
                                        type='password'
                                        variant='outlined'
                                        placeholder='Enter Your Password'
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>
                            </>
                        )}

                        {userFormTab === 'CSV Import' && (
                            <>
                                {/* Add your CSV import components here */}
                                <UniversalButton
                                    label={file ? `1 documents(s) selected` :"Click here to select a csv file."}
                                    textColor='common.black'
                                    onClick={handleUploadFile}
                                    fontSize={"small"}
                                    backgroundColor='transparent'
                                    sx={{

                                        lineHeight: '1.25rem',
                                        py: '.75rem',
                                        border: `1px dashed ${theme.palette.grey[400]}`,
                                        borderRadius: ".75rem",
                                        '&:hover': {
                                            border: `1px dashed ${theme.palette.grey[500]}`,

                                            backgroundColor: theme.palette.grey[300],
                                        }
                                    }}
                                />



                                <Text 
                                fontSize=".75rem" 
                             color={ theme.palette.grey[700]}
                                sx={{
                                    lineHeight: '1rem',
                                }}>ⓘ Ensure your CSV file includes 4 columns in this order: Name, Email, Password, Role.
                                    <a style={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: theme.palette.grey[700],
                                    }}
                                        download>
                                        Click here to download user import template file.
                                    </a>
                                </Text>


                                <input
                                    type="file"
                                    accept=".csv"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                onChange={handleFileChange}
                                />
                            </>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <UniversalButton
                        label={"Save"}
                        width={"fit-content"}
                        fontSize={"medium"}
                        textColor="common.white"
                        sx={{
                            m: ' 0 1rem',
                            fontWeight: "500",
                            backgroundColor: "success.dark",
                            border: "none",
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

{/* Edit User  dialog*/}
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        width: '30rem !important',
                        maxWidth: '100% !important',
                    }
                }}
                open={isEditUser}
                onClose={() => setIsEditUser(false)}
            >
                <DialogTitle display={'flex'} justifyContent={'space-between'}>
                    <Text fontSize="1.12rem" fontWeight="500">Edit User</Text>
                    <IconButton onClick={() => setIsEditUser(false)}>
                        <Icon>
                            <Close />
                        </Icon>
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack gap={1}>
                  
                  <Stack direction={'row'} gap={2} alignItems={'center'} ml={1} mb={1}>
                    <Avatar   sx={{ width: 56, height: 56,
                        bgcolor : orange[500]
                     }}
                    />
                    <Box >

                    <Text fontSize='1rem' fontWeight='600'>Snow</Text>
                    <Text fontSize='0.75rem' color='grey.500'>
                    Created at August 14, 2024
                        </Text>
                    </Box>
                  </Stack>

                    <Divider />
    <TextFieldContainer label='Email'>
                                    <TextField
                                    value={'test@gmail.com'}
                                    disabled
                                        type='email'
                                        variant='outlined'
                                        placeholder='Enter Your Email '
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>

                                <TextFieldContainer label='Name'>
                                    <TextField
                                        type='text'
                                        variant='outlined'
                                        placeholder='Enter Your Full Name'
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>

                                <TextFieldContainer label='New Password'>
                                    <TextField

                                        type='password'
                                        variant='outlined'
                                        placeholder='Enter New Password'
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'common.white',
                                                borderRadius: '.5rem',
                                            },
                                            '& fieldset': {
                                                border: 'none !important',
                                            },
                                        }}
                                    />
                                </TextFieldContainer>
                            
                        

                     
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <UniversalButton
                        label={"Save"}
                        width={"fit-content"}
                        fontSize={"medium"}
                        textColor="common.white"
                        sx={{
                            m: ' 0 1rem',
                            fontWeight: "500",
                            backgroundColor: "success.dark",
                            border: "none",
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
