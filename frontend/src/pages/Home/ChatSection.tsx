
import {  Box, Stack } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import UserMessage from "./UserMessage";

import ResponseMessage from "./ResponseMessage/ResponseMessage";
import UploadFileDisplay from "../../components/common/Sidebar/UploadFileDisplay";
import { FileItem } from "../../types/chat";

function ChatSection({ chat, selectedModels, streamText, showNextMessage, showPreviousMessage, regenerateResponse, confirmEditMessage,deleteMessageHandler
}: any) {
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


useEffect(()=>{
document.title = chat?.chat?.title ?? 'Maadar'
},[chat])
  return (
    <Box display={"flex"} gap={1} flexDirection={"column"}> 
      {/* Question */}
      {messages?.map((message:any, index:number) => (
        <Fragment >
      
          <Stack flexDirection={'column'} gap={.5} justifyContent={"flex-end"} alignItems={'end'} width={'100%'} key={index}> 
          {message?.files?.length > 0 && 
          message?.files?.map((file:any) => (
            <>
            {(file?.type === 'image'  )? (
             <img src={file?.url} alt="imge_file" style={{maxHeight : '24rem',borderRadius :'0.5rem'}}/>
            )
          : ( <Box width={'fit-content'}>
            <UploadFileDisplay 
            file = {file}
            onFileClick = {()=>handleFileClick(file)}
          />
          </Box>)}
            
            </>
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
            isFirstMessage = {index === 0}
            deleteMessageHandler = {deleteMessageHandler}
          />

          {/* Answer */}

          <ResponseMessage
          index={index} 
          message={message}
          messages={messages}
          model = {chat?.chat?.models}
          history={history}
          streamText={streamText}
          selectedModels={selectedModels}
          showNextMessage={showNextMessage}
          showPreviousMessage={showPreviousMessage}
          regenerateResponse={regenerateResponse}
          />

        </Fragment>
      ))}
    </Box>
  );
}

export default ChatSection;
