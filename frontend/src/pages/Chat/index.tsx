import { useParams } from 'react-router-dom';

import ChatLayout from '../Home/ChatLayout';
import useChat from '../Home/useChat';

function Chat() {
    const params = useParams();
    const id = params.id || '';
    const {
        chatResponse,
        setSearchPrompt,
        searchPrompt,
        selectedModels,
        AllModelList,
        setSelectedModels,
      handleSubmit,
      streamText,
      sendPrompt,
      setHistory,
      stopResponse,
      showNextMessage,
      showPreviousMessage,
      confirmEditMessage,
      regenerateResponse ,
      files,
      setFiles   ,
      deleteMessageHandler,
    } = useChat( id );

    return (
 <ChatLayout
 chatResponse={chatResponse}
 selectedModels={selectedModels}
 AllModelList={AllModelList}
 setSelectedModels={setSelectedModels}
 handleSubmit={handleSubmit}
 searchPrompt={searchPrompt}
 setSearchPrompt={setSearchPrompt}
 streamText={streamText}
 sendPrompt={sendPrompt}
 setHistory={setHistory}
 stopResponse = {stopResponse}
 showNextMessage ={showNextMessage}
showPreviousMessage ={showPreviousMessage}
confirmEditMessage ={confirmEditMessage}
regenerateResponse ={regenerateResponse}
files={files}
setFiles={setFiles}
deleteMessageHandler={deleteMessageHandler}
 />
    );
}

export default Chat;




