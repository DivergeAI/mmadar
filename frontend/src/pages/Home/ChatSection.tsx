// import { CopyAllOutlined, EditOutlined, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
// import { Avatar, Box, Icon, IconButton, Stack, TextField, Tooltip, useTheme } from "@mui/material";
// import { Fragment, useState } from "react";
// import Text from "../../components/common/Text";
// import AnswerControls from "./AnswerControls";
// import UniversalButton from "../../components/common/UniversalButton";
// import UserMessage from "./UserMessage";

// function ChatSection({ chat,setChat }: any) {
//   console.log(chat)
//   const theme = useTheme();
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [activeIndex, setActiveIndex] = useState<number>(0);

//   const handleEditClick = (index: number) => {
//     setEditIndex(index);
//   };

//   const handleCancelClick = () => {
//     setEditIndex(null);
//   };
//   let messages = chat?.chat?.messages
//   let history = chat?.chat?.history
// console.log(chat)

//   return (
//     <Box display={"flex"} gap={3} flexDirection={"column"}>
//       {/* Question */}
//       {messages?.map((message, index) => (
//         <Fragment key={index}>
//           <UserMessage 
//           index={index} 
//           activeIndex={activeIndex}
//           setActiveIndex={setActiveIndex}
//           history={history}
//           message={message}
//           siblings = { Object.values(history?.messages).filter((message:any) => message?.parentId=== null)?.map((message:any) => message.id)} 
//           editIndex = {editIndex} 
//           handleEdit={handleEditClick} 
//           handleCancel={handleCancelClick}
//           />

//           {/* Answer */}
//           {history?.currentId === message.id && (
//             <div id='answerBlock'>
//               <Box display={"flex"} alignItems={"start"} gap={2} id='answer-div'>
//                 <Avatar />
//                 <Box display='flex' flexDirection='column' width={'100%'} gap={1}>
//                   {/* model name & time (when hover) */}
//                   <Box display={'flex'} gap={1} alignItems={'center'}>
//                     <Text fontSize="14px" fontWeight="600">{history?.messages[message?.parentId]?.models}</Text>
//                     <Text
//                       fontSize="0.75rem"
//                       fontWeight="500"
//                       color={theme.palette.grey[500]}
//                       sx={{
//                         textTransform: 'uppercase'
//                       }}
//                       props={{
//                         className: 'time-text'
//                       }}
//                     >11:01Am</Text>
//                   </Box>
//                   {/* answer */}
//                   <Box
//                     p={1}
//                     mb={1}
//                     width='100%'
//                     sx={{
//                       padding: "0rem 0",
//                       borderRadius: "1rem",
//                       // backgroundColor: theme.palette.grey[200],
//                     }}
//                   >
//                     <pre>
//                       {history?.messages[message?.id]?.content} </pre>
//                   </Box>

//                   {/* controls */}
//                   <AnswerControls siblings={history?.messages[message?.parentId].childrenIds ?? []} />
//                 </Box>
//               </Box>
//             </div>
//           )}

//         </Fragment>
//       ))}
//     </Box>
//   );
// }

// export default ChatSection;



import { Avatar, Box, useTheme } from "@mui/material";
import { Fragment, useState } from "react";
import Text from "../../components/common/Text";
import AnswerControls from "./AnswerControls";
import UserMessage from "./UserMessage";

function ChatSection({ chat,streamText }: any) {
  const theme = useTheme();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };
  let messages = chat?.chat?.messages
  let history = chat?.chat?.history

  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      {/* Question */}
      {messages?.map((message, index) => (
        <Fragment key={index}>
          <UserMessage 
          index={index} 
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          history={history}
          message={message}
          siblings = { Object.values(history?.messages).filter((message:any) => message?.parentId=== null)?.map((message:any) => message.id)} 
          editIndex = {editIndex} 
          handleEdit={handleEditClick} 
          handleCancel={handleCancelClick}
          />

          {/* Answer */}
          {history?.currentId === message?.id && (
            <div id='answerBlock'>
              <Box display={"flex"} alignItems={"start"} gap={2} id='answer-div'>
                <Avatar />
                <Box display='flex' flexDirection='column' width={'100%'} gap={1}>
                  {/* model name & time (when hover) */}
                  <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Text fontSize="14px" fontWeight="600">{history?.messages[message?.parentId]?.models}</Text>
                    <Text
                      fontSize="0.75rem"
                      fontWeight="500"
                      color={theme.palette.grey[500]}
                      sx={{
                        textTransform: 'uppercase'
                      }}
                      props={{
                        className: 'time-text'
                      }}
                    >11:01Am</Text>
                  </Box>
                  {/* answer */}
                  <Box
                    p={1}
                    mb={1}
                    width='100%'
                    sx={{
                      padding: "0rem 0",
                      borderRadius: "1rem",
                      // backgroundColor: theme.palette.grey[200],
                    }}
                  >
                    <pre>
                      {message.content || streamText} </pre>
                  </Box>

                  {/* controls */}
                  <AnswerControls siblings={history?.messages[message?.parentId].childrenIds ?? []} />
                </Box>
              </Box>
            </div>
          )}

        </Fragment>
      ))}
    </Box>
  );
}

export default ChatSection;
