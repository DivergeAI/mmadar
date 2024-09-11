import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, Stack, TextField, Tooltip, useTheme } from "@mui/material";
import Text from "../Text";
import {
    ArchiveOutlined,
    Bookmark,
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
import {  useMutation, useQuery } from "@tanstack/react-query";
import { addTagById, archiveChatById, cloneChatById, deleteChatById, deleteTagById, getTagsById, updateChatById } from "../../../api/chats";
import { queryClient } from "../../../main";
import UniversalButton from "../UniversalButton";

const ChatItem = ({ data ,index}: any) => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [chatTitle, setChatTitle] = useState(data?.title);
    const [pinned, setPinned] = useState(false);
const [open, setOpen] = useState(false);

    const token:string  = localStorage.getItem('token');

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatTitle(e.target.value);
    }

    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();  // Prevent default behavior
        e.stopPropagation(); // Stop the event from propagating to NavLink
        let id = data?.id
        mutate({token, id});
    };

    const {mutate} = useMutation({
      mutationFn: getTagsById,
      onSuccess: (data) => {
          const isPinned = data.some((tag: any) => tag.name === 'pinned');
          setPinned(isPinned); // Update the pinned state
      },
  });

const hanldeDeleteTagPinned = () => {
  let id = data?.id
  DeletePinnedTagMutation({token, id, tagName :'pinned'})
}
    
const {mutate:DeletePinnedTagMutation} = useMutation({
  mutationFn :deleteTagById,
  onSuccess : () => {
    queryClient.invalidateQueries({
      queryKey : ['tags']
    })
  }
})

const {mutate:AddPinnedTagMutation} = useMutation({
  mutationFn :addTagById,
  onSuccess : () => {
    queryClient.invalidateQueries({
      queryKey : ['tags']
    })
  }
})

const {mutate : CloneMutation} = useMutation({
  mutationFn : cloneChatById,
  onSuccess : () => {
    queryClient.invalidateQueries({
      queryKey : ['chatList']
    })
  }
})

const{mutate : ChangeChatTitleMutation} =useMutation({
  mutationFn : updateChatById,
  onSuccess : () => {
    queryClient.invalidateQueries({
      queryKey : ['chatList']
    }),
    setIsEditing(false)
  }
  })

  const {mutate : ArchieveChatMutation} = useMutation({
    mutationFn : archiveChatById,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['chatList']
      })
    }
  })


  const {mutate : DeleteChatMutation} = useMutation({
    mutationFn : deleteChatById,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ['chatList']
      }),
      setOpen(false)
    }
  })
     const options = [
        {
            name: pinned ? 'Unpin' :"Pin",
            icon: pinned ? <Bookmark/> : <BookmarkBorderOutlined />,
            onClick: () => pinned ?  hanldeDeleteTagPinned() : AddPinnedTagMutation({token, id : data.id, tagName : 'pinned'}),
        },
        {
            name: "Rename",
            icon: <CreateOutlined />,
            onClick: () => setIsEditing(true),
        },
        {
            name: "Clone",
            icon: <ContentCopyOutlined />,
            onClick: () => CloneMutation({token, id : data.id}),
        },
      
        {
            name: "Archive",
            icon: <ArchiveOutlined />,
            onClick: () => ArchieveChatMutation({token, id : data.id}),
        },
        {
            name: "Share",
            icon: <Share />,
            onClick: () => console.log("Share clicked"),
        },
        {
            name: "Delete",
            icon: <Delete />,
            onClick: () => setOpen(true),
            divider: true,
            tag : true
        },

    ];
    

    return (
        <Fragment>
{isEditing ? ( 
 <TextField
 value={chatTitle}
  onChange={handleChangeTitle}
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
                  onClick={() => ChangeChatTitleMutation({token, id : data.id, chat :{title :chatTitle } })}

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
    fontSize: '0.875rem',
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
        to={`/chat/${data.id}`}
        id="chat-item"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Ensure space between text and menu
          gap: 1,
          py: 1,
          px: 1.5,
          cursor: "pointer",
          textDecoration: "none",
          color: theme.palette.text.primary,
          boxSizing: "border-box",
          "&.active": {
            backgroundColor: theme.palette.grey[600], // Set active background color
            borderRadius: "12px",
          },
          "&:hover": {
            backgroundColor: theme.palette.grey[300],
            borderRadius: "12px",
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0, // Ensure text box shrinks when necessary
            overflow: "hidden",
          }}
        >
          <Text
            fontWeight="400"
            color={theme.palette.grey[800]}
            lines={1}
            sx={{
              letterSpacing: "0.1px",
              lineHeight: "1.25",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data?.title}
          </Text>
        </Box>
        {/* <Tooltip title="Menu" placement="top"> */}
        <Box
          className="menu-icon"
          onClick={handleMenuClick}
          sx={{
            // Prevent the icon from shrinking
          }}
        >
          <SelectMenu options={options}  />
        </Box>
        {/* </Tooltip> */}
      </Box>
      
        )}


        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        >
          <DialogTitle>Delete Chat?</DialogTitle>
          <DialogContent>

            <Text>
              This will delete {data?.title}.
            </Text>
          </DialogContent>
          <DialogActions>
            <UniversalButton 
            label='Confirm'
            onClick={() => DeleteChatMutation({token, id : data.id})}
            />
            </DialogActions>
        </Dialog>
        </Fragment>
      
    );
};

export default ChatItem;
