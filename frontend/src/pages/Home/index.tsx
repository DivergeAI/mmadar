

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
      stopResponse,
      files,
      setFiles,
      deleteMessageHandler
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
        stopResponse = {stopResponse}
        files={files}
        setFiles={setFiles}
        deleteMessageHandler={deleteMessageHandler}

      />
    );
}

export default Home;
