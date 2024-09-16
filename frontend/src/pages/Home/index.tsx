

import ChatLayout from "./ChatLayout";
import useChat from "./useChat";

function Home() {
    const {
        messages,
        chatResponse,
        setSearchPrompt,
        searchPrompt,
        selectedModels,
        AllModelList,
        ApiConfigData,
        streamText,
        setSelectedModels,
      handleSubmit,
    } = useChat();



    return (
      <ChatLayout 
      chatResponse = {chatResponse}
      handleSubmit={handleSubmit}
        searchPrompt={searchPrompt}
        setSearchPrompt={setSearchPrompt}
        AllModelList={AllModelList}
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
        messages={messages}
        ApiConfigData={ApiConfigData}
        streamText={streamText}


      />
    );
}

export default Home;
