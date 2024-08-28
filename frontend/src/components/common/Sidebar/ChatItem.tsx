import {  Box, useTheme } from "@mui/material";
import Text from "../Text";
import { ArchiveOutlined, BookmarkBorderOutlined, ContentCopyOutlined, CreateOutlined, Delete, MoreHoriz, Pin, Settings, Share } from "@mui/icons-material";
import SelectMenu from "../SelectMenu";
import { NavLink } from "react-router-dom";

export const options = [
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
    },
    {
        name: 'Settings',
        icon: <Settings />,
        onClick: () => console.log('Settings clicked')
    },
    {
        name: 'Archive',
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

const ChatItem = ({ to, chatName }: any) => {
    const theme = useTheme();

    return (
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
            <Box marginLeft={"auto"} className="menu-icon">
                <SelectMenu options={options} />
            </Box>
        </Box>
    );
};

export default ChatItem;
