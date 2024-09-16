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
 />
    );
}

export default Chat;




