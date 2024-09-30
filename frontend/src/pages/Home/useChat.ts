import { Box, useTheme } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  chatCompleted,
  generateTitle,
  getBackendConfig,
  getModels,
} from "../../api";
import { createNewChat, getChatById, updateChatById } from "../../api/chats";
import { queryClient } from "../../main";
import {
  extractSentencesForAudio,
  promptTemplate,
  splitStream,
} from "../../utils/functions";
import { getAndUpdateUserLocation } from "../../api/users";
import { generateChatCompletion } from "../../api/ollama";
import { SocketContext } from "../../Context/SocketContext";
import { useNavigate } from "react-router-dom";
import { FileItem } from "../../types/chat";

const useChat = (initialChatId = "") => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const token: string = localStorage.getItem("token") || "";
  const [selectedModels, setSelectedModels] = React.useState<string[] | null>([""]);
  const [streamText, setStreamText] = React.useState<string>("");
  const [searchPrompt, setSearchPrompt] = React.useState<string>("");
  const [history, setHistory] = React.useState<any>({
    messages: {},
    currentId: null,
  });
  let [chatId, setChatId] = React.useState<string>("");
  const [params, setparams] = React.useState<any>(null);
  const [settings, setSettings] = React.useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [stopResponseFlag, setStopResponseFlag] = useState<boolean>(false);
  const [files, setFiles] = useState<FileItem[]>([]);


  const eventTarget = new EventTarget();

  useEffect(() => {
    if (history?.currentId !== null) {
      let _messages: any[] = [];

      let currentMessage = history?.messages[history?.currentId];
      while (currentMessage !== null) {
        _messages.unshift({ ...currentMessage });
        currentMessage =
          currentMessage?.parentId !== null
            ? history?.messages[currentMessage?.parentId]
            : null;
      }
      setMessages(_messages);
    } else {
      setMessages([]);
    }
  }, [history]);

  // Listen to changes in history.messages


  const { data: SingleChatData } = useQuery({
    queryKey: ["chat", initialChatId||chatId],
    queryFn: () => getChatById(token, initialChatId),
    enabled: initialChatId !== "",
  });

  // get all modell list
  const { data: AllModelList } = useQuery({
    queryKey: ["modelList"],
    queryFn: () => getModels(token),
  });

  // get all config data
  const { data: ApiConfigData } = useQuery({
    queryKey: ["config"],
    queryFn: getBackendConfig,
  });

  // create new chat mutation trigger at first place when submit prompt
  const { mutateAsync: createNewChatMutation } = useMutation({
    mutationFn: createNewChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chatList"],
      });
    },
  });

  useEffect(() => {
    if (SingleChatData) {
      setChatId(SingleChatData?.id);
      setMessages(SingleChatData?.chat?.messages);
      setHistory(SingleChatData?.chat?.history);
      setSelectedModels(SingleChatData?.chat?.models);
    }
  }, [SingleChatData]);

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStreamText("");

    let _response: any[] = [];
    if (searchPrompt === "") {
      return;
    } else if (selectedModels?.includes("")) {
      alert("Please select a model");
      return;
    }
    else if (
      messages.length !== 0 &&
      messages[messages.length - 1].done !== true
    ) {
      console.log("messgae", messages);
      console.log("Please wait for the response");
    }
    else {
      //   create a new message
      
      let userMessageId = uuidv4();
      let userMessage = {
        id: userMessageId,
        parentId:
          messages.length !== 0 ? messages[messages.length - 1].id : null,
        childrenIds: [],
        role: "user",
        content: searchPrompt,
        files: files?.length > 0 ? files : undefined,
        timestamp: Math.floor(Date.now() / 1000), // Unix epoch
        models: selectedModels?.filter(
          (m, mIdx) => selectedModels?.indexOf(m) === mIdx
        ),
      };

      let _history = { ...history };

      _history.messages[userMessageId] = userMessage;
      _history.currentId = userMessageId;

      if (messages.length !== 0) {
        let lastMessageId = messages[messages.length - 1].id;
        _history.messages[lastMessageId] = {
          ..._history.messages[lastMessageId],
          childrenIds: [
            ..._history.messages[lastMessageId].childrenIds,
            userMessageId,
          ],
        };
      }

      //   setHistory(_history);

      _response = await sendPrompt(searchPrompt, userMessageId, _history, {
        newChat: true,
      });

      setSearchPrompt("");
    }
    return _response;
  };

  // send prompt function called inside handleSubmit
  const sendPrompt = async (
    prompt: string,
    parentId: string,
    _history?: any,
    { modelId = null, newChat = false } = {}
  ) => {
    setStreamText("");
    let token: string = localStorage.getItem("token") || "";
    let _responses: any[] = [];
    let _messages: any[] = [];
    let __history = _history ?? { ...history };

    let selectedModelId: string[] | null = modelId ? [modelId] : selectedModels;
    let _chatId = chatId || "";
    const responseMessageIds: { [key: string]: string } = {};

    // create resposne message fo reach selected model
    if (selectedModelId !== null) {
      for (let modelId of selectedModelId) {
        let model = AllModelList?.find((m: any) => m.id === modelId);

        if (model) {
          let responseMessageId = uuidv4();
          let responseMessage = {
            parentId: parentId,
            id: responseMessageId,
            childrenIds: [],
            role: "assistant",
            content: "",
            model: model.id,
            modelName: model.name ?? model.id,
            userContext: null,
            timestamp: Math.floor(Date.now() / 1000), // Unix epoch
          };
          responseMessageIds[modelId] = responseMessageId;
          console.log("messages before adding new", __history)
          __history.messages[responseMessageId] = responseMessage;
          __history.currentId = responseMessageId;

          if (parentId !== null) {
            let parentMessage = __history.messages[parentId];
            __history.messages[parentId] = {
              ...parentMessage,
              childrenIds: [...parentMessage.childrenIds, responseMessageId],
            };
          }
        }

        if (__history.currentId !== null) {
          let currentMessage = __history.messages[__history.currentId];
          while (currentMessage !== null) {
            _messages.unshift({ ...currentMessage });
            currentMessage =
              currentMessage.parentId !== null
                ? __history.messages[currentMessage.parentId]
                : null;
          }
          setMessages(_messages)
        } else {
          setMessages([]);
        }
        console.log(
          "messhaes before adding new", messages
        )
        console.log("messages at create new chat ", _messages);
        // create new chat if message length  === 2
        if (newChat && _messages.length === 2) {
          let payload = {
            token,
            chat: {
              id: chatId,
              title: "New Chat",
              models: selectedModels,
              system: undefined,
              params: params,
              messages: _messages,
              history: __history,
              tags: [],
              timestamp: Date.now(),
            },
          };

          await createNewChatMutation(payload, {
            onSuccess: (data) => {
              _chatId = data.id;
              console.log("Chat created successfully:", data);
              setChatId(data.id);
            },
          });
        }
      }
    }

    selectedModels?.map(async (modelId) => {
      let model = AllModelList?.find((m: any) => m.id === modelId);

      if (model) {
        console.log("messgae", _messages);
        // check if there are image files, if model is vision capable
        const hasImage = _messages.some((message) =>
          message?.files?.some((file: any) => file.type === "image")
        );

        // memory query here ------------------api here

        //  chat Even tEmitter ----------------api here

        // getWebSearchResults  --enable 0r disable-- ----------------api here
        let responseMessageId = responseMessageIds[modelId];
        console.log("responseMessageId", responseMessageId);
        let _response;
        if (model?.owned_by === "openai") {
          // openai api here
        } else if (model) {
          _response = await sendPromptOllama(
            model,
            prompt,
            responseMessageId,
            _chatId,
            __history,
            _messages
          );
          // ollama  api here
        }
      }
    });

    return _responses; // Ensure to return the response
  };

  // send prompt ollama function called inside sendPrompt
  const sendPromptOllama = async (
    model: any,
    prompt: string,
    responseMessageId: string,
    chatId: any,
    _history: any,
    _messages: any
  ) => {
    let _response = null;

    const responseMessage = _history.messages[responseMessageId];
    const userMessage = _history.messages[responseMessage.parentId];

    const systemMessage =
      params?.system ||
        settings?.system ||
        (responseMessage?.userContext ?? null)
        ? {
          role: "system",
          content: `${promptTemplate(
            params?.system ?? settings.system ?? "",
            user.name,
            settings?.userLocation
              ? await getAndUpdateUserLocation(
                localStorage.getItem("token") || ""
              )
              : undefined
          )}${responseMessage?.userContext
            ? `\n\nUser Context:\n${responseMessage?.userContext}`
            : ""
            }`,
        }
        : undefined;

    const messagesBody = [systemMessage, ..._messages]
      ?.filter((message) => {
        // Ensure message content is a string and then trim it
        return message?.content?.trim();
      })
      .map((message) => {
        // Prepare the base message object
        const baseMessage: any = {
          role: message.role,
          content: message.content,
        };

        // Extract and format image URLs if any exist
        const imageUrls = message.files
          ?.filter((file: File) => file.type === "image")
          .map((file: any) => file?.url.slice(file?.url.indexOf(",") + 1));

        // Add images array only if it contains elements
        if (imageUrls && imageUrls.length > 0 && message.role === "user") {
          baseMessage.images = imageUrls;
        }

        return baseMessage;
      });

    let lastImageIndex = -1;

    // Find the index of the last object with images
    messagesBody.forEach((item, index) => {
      if (item.images) {
        lastImageIndex = index;
      }
    });

    // add files part later  =====================

    eventTarget.dispatchEvent(
      new CustomEvent("chat:start", {
        detail: {
          id: responseMessageId,
        },
      })
    );

    // call ollama api here
    const [res, controller] = await generateChatCompletion(token, {
      stream: true,
      model: model.id,
      messages: messagesBody,
      options: {
        ...(params ?? settings?.params ?? {}),
        stop:
          params?.stop ?? settings?.params?.stop ?? undefined
            ? (
              params?.stop.split(",")?.map((token: any) => token?.trim()) ??
              settings?.params?.stop
            ).map((str: string) =>
              decodeURIComponent(
                JSON.parse('"' + str.replace(/\"/g, '\\"') + '"')
              )
            )
            : undefined,
        num_predict:
          params?.max_tokens ?? settings?.params?.max_tokens ?? undefined,
        repeat_penalty:
          params?.frequency_penalty ??
          settings?.params?.frequency_penalty ??
          undefined,
      },
      format: settings?.requestFormat ?? undefined,
      keep_alive: settings?.keepAlive ?? undefined,
      tool_ids: undefined, //selectedToolIds.length > 0 ? selectedToolIds : undefined
      files: files?.length > 0 ? files : undefined,
      session_id: socket?.id ?? "",
      chat_id: chatId,
      id: responseMessageId,
    });

    if (res instanceof Response && res.ok) {
      const reader = res?.body && res?.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(splitStream("\n"))
        .getReader();

      while (true) {
        const { value, done } = await reader?.read();
        if (done || stopResponseFlag || !chatId) {
          responseMessage.done = true;
          if (stopResponseFlag) {
            controller?.abort("User: Stop Response");
          } else {
            console.log("Else BlOCK trigger");
            const messages = createMessagesList(responseMessageId, _history);
            _messages = messages;
            await chatCompletedHandler(
              chatId,
              model?.id,
              responseMessageId,
              messages,
              _history
            );
          }
          _response = responseMessage.content;
          break;
        }

        try {
          let lines = value.split("\n");
          for (const line of lines) {
            if (line !== "") {
              let data = JSON.parse(line);
              if ("citations" in data) {
                responseMessage.citations = data.citations;
                continue;
              }

              if ("detail" in data) {
                throw data;
              }

              if (data.done == false) {
                if (
                  responseMessage.content == "" &&
                  data.message.content == "\n"
                ) {
                  continue;
                } else {
                  responseMessage.content += data.message.content;
                  setStreamText(responseMessage.content);

                  // uncomment later
                  const sentences = extractSentencesForAudio(
                    responseMessage.content
                  );
                  sentences.pop();

                  // dispatch only last sentence and make sure it hasn't been dispatched before
                  if (
                    sentences.length > 0 &&
                    sentences[sentences.length - 1] !==
                    responseMessage.lastSentence
                  ) {
                    responseMessage.lastSentence =
                      sentences[sentences.length - 1];
                    eventTarget.dispatchEvent(
                      new CustomEvent("chat", {
                        detail: {
                          id: responseMessageId,
                          content: sentences[sentences.length - 1],
                        },
                      })
                    );
                  }
                }
              } else {
                responseMessage.done = true;

                if (responseMessage.content == "") {
                  responseMessage.error = {
                    code: 400,
                    content: `Oops! No text generated from Ollama, Please try again.`,
                  };
                }

                responseMessage.context = data.context ?? null;
                responseMessage.info = {
                  total_duration: data.total_duration,
                  load_duration: data.load_duration,
                  sample_count: data.sample_count,
                  sample_duration: data.sample_duration,
                  prompt_eval_count: data.prompt_eval_count,
                  prompt_eval_duration: data.prompt_eval_duration,
                  eval_count: data.eval_count,
                  eval_duration: data.eval_duration,
                };


                //  ===================== later add this part
                // if (settings?.notificationEnabled && !document.hasFocus()) {
                // 	const notification = new Notification(`${model.id}`, {
                // 		body: responseMessage.content,
                // 		icon: `/static/favicon.png`
                // 	});
                // }

                // if (settings?.responseAutoCopy ?? false) {
                // 	copyToClipboard(responseMessage.content);
                // }

                // if (settings.responseAutoPlayback && !showCallOverlay) {
                // 	await tick();
                // 	document.getElementById(`speak-button-${responseMessage.id}`)?.click();
                // }
              }
            }
          }
        } catch (error:any) {
          console.log(error);
          if ("detail" in error) {
            alert(error.detail);
            // toast.error(error.detail);
          }
          break;
        }

        // add scroll to bottom later =======

        // if (autoScroll) {
        // 	scrollToBottom();
        // }
      }
    } else {
      if (res !== null) {
        const error = await res?.json();
        console.log(error);
        if ("detail" in error) {
          console.log("error", error);
          // toast.error(error.detail);
          responseMessage.error = { content: error.detail };
        } else {
          console.log("error", error);
          // toast.error(error.error);
          responseMessage.error = { content: error.error };
        }
      } else {
        let provider = model?.owned_by === "openai" ? "OpenAI" : "Ollama";
        console.log(`Uh-oh! There was an issue connecting to ${{ provider }}.`);
        // toast.error(
        // 	$i18n.t(`Uh-oh! There was an issue connecting to {{provider}}.`, { provider: 'Ollama' })
        // );
        // responseMessage.error = {
        // 	content: $i18n.t(`Uh-oh! There was an issue connecting to {{provider}}.`, {
        // 		provider: 'Ollama'
        // 	})
        // };

        responseMessage.error = {
          content: `Oops! No text generated from Ollama, Please try again.`,
        };
      }
      responseMessage.done = true;
      // messages = messages;
    }

    setStopResponseFlag(false);

    let lastSentence =
      extractSentencesForAudio(responseMessage.content)?.at(-1) ?? "";
    if (lastSentence) {
      eventTarget.dispatchEvent(
        new CustomEvent("chat", {
          detail: { id: responseMessageId, content: lastSentence },
        })
      );
    }
    eventTarget.dispatchEvent(
      new CustomEvent("chat:finish", {
        detail: {
          id: responseMessageId,
          content: responseMessage.content,
        },
      })
    );

    // scroll to bottom here later ======
    if (
      _messages?.length == 2 &&
      _messages?.at(1).content !== "" &&
      selectedModels?.[0] === model.id
    ) {
      navigate(`/chat/${chatId}`);
      //   window.history.replaceState(history.state, "", `/chat/${chatId}`);
      const _title = await generateChatTitle(prompt);

      await setChatTitle(chatId, _title);
    }

    return _response;
  };



  // create message list function called inside sendPromptOllama
  const createMessagesList: any = (responseMessageId: any, _history: any) => {
    const message = _history.messages[responseMessageId];
    if (message.parentId) {
      return [...createMessagesList(message.parentId, _history), message];
    } else {
      return [message];
    }
  };

  const generateChatTitle = async (userPrompt: string) => {
    console.log("generateChatTitle called -------->");
    if (settings?.title?.auto ?? true) {
      const title = await generateTitle(
        localStorage.token,
        selectedModels?.[0],
        userPrompt,
        chatId
      ).catch((error) => {
        console.error(error);
        return "New Chat";
      });

      return title;
    } else {
      return `${userPrompt}`;
    }
  };

  const setChatTitle = async (_chatId: any, _title: string) => {

    console.log("setChatTitle called -------->");
    // if ((_chatId === chatId && settings?.saveChatHistory) ?? true) {
    let payload = {
      token: localStorage.token,
      id: _chatId,
      chat: {
        title: _title,
      },
    };
    await updateChatByIdMutation(payload);

    // await chats.set(await getChatList(localStorage.token, $currentChatPage));

    // }
  };

  //   chat completed handler function called inside sendPromptOllama
  const chatCompletedHandler = async (chatId : string, modelId : string,responseMessageId:string, messages : any,history:any
  ) => {
    // await mermaid.run({
    // 	querySelector: '.mermaid'
    // });

    console.log("chatCompletedHandler called -------->"); 
    const res = await chatCompleted(localStorage.token, {
      model: modelId,
      messages: messages.map((m:any) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        info: m.info ? m.info : undefined,
        timestamp: m.timestamp,
      })),
      chat_id: chatId,
      session_id: socket?.id,
      id: responseMessageId,
    }).catch((error) => {
      console.log("error", error);
      // toast.error(error);
      messages.at(-1).error = { content: error };

      return null;
    });

    if (res !== null) {
      // Update chat history with the new messages
      for (const message of res.messages) {
        history.messages[message.id] = {
          ...history.messages[message.id],
          ...(history?.messages[message.id].content !== message.content
            ? { originalContent: history.messages[message.id].content }
            : {}),
          ...message,
        };
      }
    }

    if (chatId == chatId) {
      // if (settings.saveChatHistory ?? true) {
      if (true) {
        let payload = {
          token: localStorage.token,
          id: chatId,
          chat: {
            models: selectedModels,
            messages: messages,
            history: history,
            params: params,
            files: files,
          },
        };
        await updateChatByIdMutation(payload);
      }
    }
  };

  const { mutateAsync: updateChatByIdMutation } = useMutation({
    mutationFn: updateChatById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chatList"],
      });
      // RefetchSingleChatData()
    },
  });
  // stop Response
  const stopResponse = () => {
    setStopResponseFlag(true)
  }


  const showPreviousMessage = async (message:Object) => {

    if (message?.parentId !== null) {
      console.log("message ata prev messgae", message)
      let messageId =
        history.messages[message?.parentId].childrenIds[
        Math.max(history.messages[message?.parentId].childrenIds.indexOf(message.id) - 1, 0)
        ];

      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;

        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        setHistory({
          ...history,
          currentId: messageId
        })
      }
    } else {
      let childrenIds = Object.values(history.messages)
        .filter((message) => message.parentId === null)
        .map((message) => message.id);
      let messageId = childrenIds[Math.max(childrenIds.indexOf(message.id) - 1, 0)];
      if (message.id !== messageId) {
        console.log("messag", message?.id, messageId)
        let messageChildrenIds = history.messages[messageId].childrenIds;

        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        setHistory({
          ...history,
          currentId: messageId
        })
        // history.currentId = messageId;
      }
    }

  };

  const showNextMessage = async (message:any) => {
    if (message.parentId !== null) {
      let messageId =
        history.messages[message.parentId].childrenIds[
        Math.min(
          history.messages[message.parentId].childrenIds.indexOf(message.id) + 1,
          history.messages[message.parentId].childrenIds.length - 1
        )
        ];

      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;

        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        setHistory({
          ...history,
          currentId: messageId
        })

      }
    } else {

      let childrenIds = Object.values(history.messages)
        .filter((message:any) => message?.parentId === null)
        .map((message:any) => message?.id);
      console.log("childre Id", childrenIds)


      let messageId =
        childrenIds[Math.min(childrenIds.indexOf(message.id) + 1, childrenIds.length - 1)];

      console.log("message ID", messageId)
      if (message.id !== messageId) {
        let messageChildrenIds = history.messages[messageId].childrenIds;

        while (messageChildrenIds.length !== 0) {
          messageId = messageChildrenIds.at(-1);
          messageChildrenIds = history.messages[messageId].childrenIds;
        }
        setHistory({
          ...history,
          currentId: messageId
        })
      }
    }
  };

  const confirmEditMessage = async (messageId: any, content: string) => {
    let userPrompt = content;
    let userMessageId = uuidv4();
    console.log(userPrompt, messageId)

    console.log("history", history)
    let userMessage = {
      id: userMessageId,
      parentId: history?.messages[messageId]?.parentId,
      childrenIds: [],
      role: 'user',
      content: userPrompt,
      ...(history.messages[messageId]?.files && { files: history.messages[messageId]?.files }),
      models: selectedModels?.filter((m, mIdx) => selectedModels?.indexOf(m) === mIdx)
    };

    let messageParentId = history?.messages[messageId]?.parentId;

    if (messageParentId !== null) {
      history.messages[messageParentId].childrenIds = [
        ...history?.messages[messageParentId]?.childrenIds,
        userMessageId
      ];
    }

    history.messages[userMessageId] = userMessage;
    history.currentId = userMessageId;

    await sendPrompt(userPrompt, userMessageId);
  };

  // regenerate Resposne

  const regenerateResponse = async (message:any) => {

    if (messages?.length != 0) {
      let userMessage = history?.messages[message.parentId];
      let userPrompt = userMessage.content;

      if ((userMessage?.models ?? [...(selectedModels || [])]).length == 1) {
        // If user message has only one model selected, sendPrompt automatically selects it for regeneration
        await sendPrompt(userPrompt, userMessage.id);
      } else {
        // If there are multiple models selected, use the model of the response message for regeneration
        // e.g. many model chat
        await sendPrompt(userPrompt, userMessage.id, { modelId: message.model });
      }
    }
  };


  // delete Message

  const deleteMessageHandler = async (messageId:any) => {
    const messageToDelete = history.messages[messageId];
    const parentMessageId = messageToDelete?.parentId;
    const childMessageIds = messageToDelete?.childrenIds??[];
    let _history = { ...history };


    const hasDescendantMessages =  childMessageIds?.some((childId:string) => 
      _history?.messages[childId]?.children?.length > 0
    )

    console.log("histiry before",_history)
    _history.currentId = parentMessageId


    _history.messages[parentMessageId].childrenIds = _history?.messages[parentMessageId]?.childrenIds?.filter((childId:string) => childId !== messageId)


    childMessageIds.forEach((childId:string) => {
			const childMessage = _history.messages[childId];

			if (childMessage && childMessage.childrenIds) {
				if (childMessage.childrenIds.length === 0 && !hasDescendantMessages) {
					// If there are no other responses/prompts
					history.messages[parentMessageId].childrenIds = [];
				} else {
					childMessage.childrenIds.forEach((grandChildId:string) => {
						if (_history.messages[grandChildId]) {
							_history.messages[grandChildId].parentId = parentMessageId;
							_history.messages[parentMessageId].childrenIds.push(grandChildId);
						}
					});
				}
			}

			// Remove child message id from the parent message's children array
			_history.messages[parentMessageId].childrenIds = history.messages[
				parentMessageId
			].childrenIds.filter((id:string) => id !== childId);
		});

let payload = {
  token ,
  id : chatId,
  chat : {
    messages : messages,
    history : _history
  }
}

    await updateChatByIdMutation(payload)
    
  }

  let chat = {
    chat: {
      title: SingleChatData?.chat?.title,
      messages,
      history,
    },
  };



  return {
    chatResponse: chat,
    streamText,
    ApiConfigData,
    setStopResponseFlag,
    selectedModels,
    setSelectedModels,
    searchPrompt,
    setSearchPrompt,
    messages,
    setMessages,
    history,
    AllModelList,
    handleSubmit,
    createNewChatMutation,
    sendPrompt,
    setHistory,
    stopResponse,
    showNextMessage,
    showPreviousMessage,
    confirmEditMessage,
    regenerateResponse,
    files,
    setFiles,
    deleteMessageHandler
  };
};

export default useChat;
