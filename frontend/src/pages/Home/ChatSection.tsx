
import {  Box, Stack, useTheme } from "@mui/material";
import { Fragment, useState } from "react";

import UserMessage from "./UserMessage";

import ResponseMessage from "./ResponseMessage";
import { copyToClipboard } from "../../utils/functions";
import UploadFileDisplay from "../../components/common/Sidebar/UploadFileDisplay";
import { FileItem } from "../../types/chat";
import Skelton from "../../components/common/Skelton";

function ChatSection({ chat, streamText, showNextMessage, showPreviousMessage, regenerateResponse, confirmEditMessage,deleteMessageHandler
}: any) {
  const theme = useTheme();
  let messages = chat?.chat?.messages
  let history = chat?.chat?.history
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  const handleCopyText = async(text:string)=>{
    console.log("message ot copy",)
const res = await copyToClipboard(text);
    if(res){
        console.log("message copied")
    }
}


const handleFileClick = (file:FileItem)=>{
  

    if (file?.url) {
      if (file?.type === 'file') {
        if (window) {
          window.open(`${file?.url}/content`, '_blank')?.focus();
        }
      } else {
        const newWindow = window.open(`${file?.url}`, '_blank');
        newWindow?.focus();
      }
    }


}

  return (
    <Box display={"flex"} gap={3} flexDirection={"column"}>
      {/* Question */}
      {messages?.map((message:any, index:number) => (
        <Fragment key={index}>
          
          <Stack flexDirection={'column'} gap={.5} justifyContent={"flex-end"} alignItems={'end'} width={'100%'}>
          {message?.files?.length > 0 && 
          message?.files?.map((file:any, index:number) => (
            <Box width={'fit-content'}>
              <UploadFileDisplay 
              file = {file}
              onFileClick = {()=>handleFileClick(file)}
            />
            </Box>
          )  
          )
        }
          </Stack>
         
          
          <UserMessage
            index={index}
            activeIndex={activeIndex}
            setEditIndex={setEditIndex}
            setActiveIndex={setActiveIndex}
            history={history}
            message={message}
            siblings={message?.parentId !== null
              ? history?.messages[message?.parentId]?.childrenIds ?? []
              : Object.values(history?.messages)
                .filter((message:any) => message?.parentId === null)
                .map((message:any) => message?.id) ?? []}
            editIndex={editIndex}
            handleEdit={handleEditClick}
            handleCancel={handleCancelClick}
            confirmEditMessage={confirmEditMessage}
            showNextMessage={showNextMessage}
            showPreviousMessage={showPreviousMessage}
            handleCopyText={handleCopyText}
            isFirstMessage = {index === 0}
            deleteMessageHandler = {deleteMessageHandler}
          />

          {/* Answer */}

          <ResponseMessage
          index={index} 
          message={message}
          messages={messages}
          history={history}
          streamText={streamText}
          showNextMessage={showNextMessage}
          showPreviousMessage={showPreviousMessage}
          regenerateResponse={regenerateResponse}
          handleCopyText={handleCopyText}
          />

        </Fragment>
      ))}
    </Box>
  );
}

export default ChatSection;
