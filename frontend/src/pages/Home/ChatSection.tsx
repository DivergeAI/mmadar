import {  CopyAllOutlined, EditOutlined } from "@mui/icons-material";
import { Avatar, Box, Icon, IconButton, Tooltip, useTheme } from "@mui/material";
import  { Fragment } from "react";
import Text from "../../components/common/Text";
import AnswerControls from "./AnswerControls";



function ChatSection() {
  const theme = useTheme();

  
  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      {/* Question */}

{[...Array(3).keys()].map((item, index) => (
    <Fragment key={index}>
 <div id="question-div">
 <Box
   p={1}
   mb={1}
   maxWidth={"90%"}
   width={"fit-content"}
   marginLeft={"auto"}
   sx={{
     padding: "0.5rem 1.25rem",
     borderRadius: "1.25rem",
     backgroundColor: theme.palette.grey[200],
   }}
 >
   <pre>
     What are 5 creative things I could do with my kids' art? I don't
     want to throw them away, but it's also so much clutter.
   </pre>
 </Box>

 {/* copy Buttons */}

 <Box
   display={"flex"}
   justifyContent={"flex-end"}
     gap={1} 
     className="copy-buttons"         
 >
    <Tooltip title='Copy'>
   <IconButton>
     <CopyAllOutlined />
   </IconButton>
   </Tooltip>
   <Tooltip title='Edit'>
   <IconButton>
     <EditOutlined />
   </IconButton>
   </Tooltip>
 </Box>
</div>
     

      {/* Answer */}
<div id='answerBlock'>
      <Box display={"flex"} alignItems={"start"} gap={2} id='answer-div'>
        <Avatar />
        <Box display='flex' flexDirection='column' width={'100%'} gap={1}>
            {/* modal name & time (when hiver) */}
            <Box display={'flex'} gap={1} alignItems={'center'}>
            <Text fontSize="14px" fontWeight="600">Model Name</Text>
            <Text fontSize="0.75rem" fontWeight="500" color= {theme.palette.grey[500]} sx={{
                textTransform: 'uppercase'
            }}>11:01Am</Text>

            </Box>
            {/* answer */}
            <Box
   p={1}
   mb={1}
   width='100%'
//    maxWidth={"90%"}
   sx={{
     padding: "0.5rem 1.25rem",
     borderRadius: "1rem",
     backgroundColor: theme.palette.grey[200],
   }}
 >
   <pre>
     What are 5 creative things I could do with my kids' art? I don't
     want to throw them away, but it's also so much clutter.
   </pre>
 </Box>

{/* controls */}

           
              <AnswerControls />
            
        </Box>
      </Box>
      </div>
      </Fragment>
        ))}
    </Box>
  );
}

export default ChatSection;


