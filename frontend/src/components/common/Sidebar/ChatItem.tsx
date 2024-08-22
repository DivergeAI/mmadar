import { Avatar, Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { useState } from "react";
import Text from "../Text";
import { ArchiveOutlined, BookmarkBorderOutlined, ContentCopyOutlined, CreateOutlined, Delete, MoreHoriz, Pin, Settings, Share } from "@mui/icons-material";
import SelectMenu from "../SelectMenu";


const options = [
    {
        name: 'Pin',
        icon: <BookmarkBorderOutlined />,
        onClick: () => console.log('Profile clicked')
    },
    {
        name: 'Rename',
        icon: <CreateOutlined />,
        onClick: () => console.log('Settings clicked')
    },
    {
        name: 'Clone',
        icon: <ContentCopyOutlined />,
        onClick: () => console.log('Logout clicked')
    }
    ,
    {
        name: 'Settings',
        icon: <Settings />,
        onClick: () => console.log('Settings clicked')
    },

    {
        name: 'Archieve',
        icon: <ArchiveOutlined />,
        onClick: () => console.log('Profile clicked')
    },
    {
        name: 'Share',
        icon: <Share />,
        onClick: () => console.log('Settings clicked')
    },
    {
        name: 'Delete',
        icon: <Delete />,
        onClick: () => console.log('Logout clicked')
    },
    { name: 'Logout', onClick: () => console.log('Logout clicked') }
]


const ChatItem = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1,
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: theme.palette.grey[300],
                    borderRadius: "12px",
                },
                flexGrow: 1,
            }}
        >

            <Text fontWeight="500" color={theme.palette.grey[800]}>
                New Chat
            </Text>
            <Box marginLeft={'auto'}>

                <SelectMenu options={options} />
            </Box>
        </Box>
    )
}

export default ChatItem;