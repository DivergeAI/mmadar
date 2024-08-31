import { Box, Divider, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip, useTheme } from "@mui/material";
import Text from "../Text";
import {
    ArchiveOutlined,
    BookmarkBorderOutlined,
    Clear,
    ContentCopyOutlined,
    CreateOutlined,
    Delete,
    Done,
    Settings,
    Share,
    Tag,
} from "@mui/icons-material";
import SelectMenu from "../SelectMenu";
import { NavLink } from "react-router-dom";
import { Fragment, useState } from "react";

const ChatItem = ({ to, chatName }: any) => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);

    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();  // Prevent default behavior
        e.stopPropagation(); // Stop the event from propagating to NavLink
    };

     const options = [
        {
            name: "Pin",
            icon: <BookmarkBorderOutlined />,
            onClick: () => console.log("Pin clicked"),
        },
        {
            name: "Rename",
            icon: <CreateOutlined />,
            onClick: () => setIsEditing(true),
        },
        {
            name: "Clone",
            icon: <ContentCopyOutlined />,
            onClick: () => console.log("Clone clicked"),
        },
        {
            name: "Settings",
            icon: <Settings />,
            onClick: () => console.log("Settings clicked"),
        },
        {
            name: "Archive",
            icon: <ArchiveOutlined />,
            onClick: () => console.log("Archive clicked"),
        },
        {
            name: "Share",
            icon: <Share />,
            onClick: () => console.log("Share clicked"),
        },
        {
            name: "Delete",
            icon: <Delete />,
            onClick: () => console.log("Delete clicked"),
            divider: true,
            tag : true
        },

    ];
    

    return (
        <Fragment>
{isEditing ? ( 
 <TextField
 value={chatName}
 variant="outlined"
 InputProps={{
   endAdornment: (
     <InputAdornment
       position="end"
       sx={{
         '&.MuiInputAdornment-root': {
            padding : '0 0.5rem'
         },
       }}
     >
       <Stack direction="row" alignItems="center" gap={1.5}> {/* Adjusted gap value */}
        <Tooltip title = 'Confirm' placement="top">
         <IconButton
           sx={{
             padding: '0px',
             width: '1rem',
             height: '1rem',
             backgroundColor: 'transparent',
             '&:hover': {
               backgroundColor: 'transparent !important',
             },
           }}
         >
           <Icon fontSize="small">
             <Done 
             sx={{
                color: theme.palette.grey[800],
                width: '1rem',
                height: '1rem',
             }}/>
           </Icon>
         </IconButton>
         </Tooltip>
         <Tooltip title = 'Cancel' placement="top" >
         <IconButton
         onClick={() => setIsEditing(false)}
           sx={{
             padding: '0px',
             width: '1rem',
             height: '1rem',
             backgroundColor: 'transparent',
             '&:hover': {
               backgroundColor: 'transparent !important',
             },
           }}
         >
           <Icon fontSize="small">
             <Clear 
             sx={{
                color: theme.palette.grey[800],
                width: '1rem',
                height: '1rem',
             }}/>
           </Icon>
         </IconButton>
         </Tooltip>
       </Stack>
     </InputAdornment>
   ),
 }}
 sx={{
   width: "100%",
   "& .MuiInputBase-root": {
     padding: '0px',
     borderRadius: "12px",
     backgroundColor: theme.palette.grey[300],
   },
   '& fieldset': {
     border: "none !important",
   }
 }}
/>

 
) : 
      (  
        <Box
            component={NavLink}
            to={to}
            id="chat-item"
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                cursor: "pointer",
                textDecoration: "none",
                color: theme.palette.text.primary,
                "&.active": {
                    backgroundColor: theme.palette.grey[300], // Set active background color
                    borderRadius: "12px",
                },
                "&:hover": {
                    backgroundColor: theme.palette.grey[300],
                    borderRadius: "12px",
                },
               
                flexGrow: 1,
            }}
        >
            <Text fontWeight="500" color={theme.palette.grey[800]}>
                {chatName}
            </Text>
            <Box marginLeft={"auto"} className="menu-icon" onClick={handleMenuClick}>
                <SelectMenu options={options}/>
            </Box>
        </Box>
        )}
        </Fragment>
      
    );
};

export default ChatItem;
