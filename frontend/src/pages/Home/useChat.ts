import { Box, useTheme } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { chatCompleted, generateTitle, getBackendConfig, getModels } from "../../api";
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

const useChat = (initialChatId= '') => {

    
    const theme = useTheme();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const token: string = localStorage.getItem("token") || "";
    const [selectedModels, setSelectedModels] = React.useState<string[] | null>([
        "",
    ]);

    const [streamText, setStreamText] = React.useState<string>("");
    const [searchPrompt, setSearchPrompt] = React.useState<string>("");
    const [history, setHistory] = React.useState<any>({
        messages: {},
        currentId: null,
    });
    let [chatId, setChatId] = React.useState<string>('');
    const [params, setparams] = React.useState<any>(null);
    const [settings, setSettings] = React.useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [stopResponseFlag, setStopResponseFlag] = useState<boolean>(false);
    
    const eventTarget = new EventTarget();



    useEffect(() => {
        if (history.currentId !== null) {
            let _messages: any[] = [];

            let currentMessage = history.messages[history.currentId];
            while (currentMessage !== null) {
                _messages.unshift({ ...currentMessage });
                currentMessage =
                    currentMessage.parentId !== null
                        ? history.messages[currentMessage.parentId]
                        : null;
            }
            setMessages(_messages);
        } else {
            setMessages([]);
        }
    }, [history]);

    

    const { data: SingleChatData } = useQuery({
        queryKey: ['chat', initialChatId],
        queryFn: () => getChatById(token, initialChatId),
        enabled: initialChatId !== '',
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
        setChatId(SingleChatData.id);
        setMessages(SingleChatData.chat.messages);
        setHistory(SingleChatData.chat.history);
        setSelectedModels(SingleChatData.chat.models);
    }
}, [SingleChatData]);

console.log("chat id in use chat",chatId);

    // handle submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("handleSubmit called");
        let _response: any[] = [];
        if (searchPrompt === "") {
            return;
        } else if (selectedModels?.includes("")) {
            alert("Please select a model");
            return;
        } else if (
            messages.length !== 0 &&
            messages[messages.length - 1].done !== true
        ) {
            console.log("messgae",messages)
            console.log("Please wait for the response");
        } else {

            //   create a new message
            let _files: any = [];
            let userMessageId = uuidv4();
            let userMessage = {
                id: userMessageId,
                parentId:
                    messages.length !== 0 ? messages[messages.length - 1].id : null,
                childrenIds: [],
                role: "user",
                content: searchPrompt,
                files: _files.length > 0 ? _files : undefined,
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
            setHistory(_history);


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
        _history: any,
        { modelId = null, newChat = false } = {}
    ) => {
        console.log("send prompt called");
        let token: string = localStorage.getItem("token") || "";
        let _responses: any[] = [];
        let _messages: any[] = [];

        let selectedModelId: string[] | null = modelId ? [modelId] : selectedModels;
        let _chatId = chatId || '';
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

                    _history.messages[responseMessageId] = responseMessage;
                    _history.currentId = responseMessageId;

                    if (parentId !== null) {
                        let parentMessage = _history.messages[parentId];
                        _history.messages[parentId] = {
                            ...parentMessage,
                            childrenIds: [...parentMessage.childrenIds, responseMessageId],
                        };
                    }
                }
                setHistory(_history);

                if (_history.currentId !== null) {
                    let currentMessage = _history.messages[_history.currentId];
                    while (currentMessage !== null) {
                        _messages.unshift({ ...currentMessage });
                        currentMessage =
                            currentMessage.parentId !== null
                                ? _history.messages[currentMessage.parentId]
                                : null;
                    }
                    setMessages(_messages);
                } else {
                    setMessages([]);
                }

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
                            history: _history,
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
                        _history,
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
        console.log("send prompt ollama called");

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
            files: undefined, ///files.length > 0 ? files : undefined
            session_id: socket?.id ?? "",
            chat_id: chatId,
            id: responseMessageId,
        });

        if (res instanceof Response && res.ok) {

            const reader = res?.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(splitStream("\n"))
                .getReader();

            while (true) {
                const { value, done } = await reader.read();
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
                            model.id,
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

                                console.log("responseMessage", responseMessage);

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
                } catch (error) {
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
        }

        else {
            if (res !== null) {
                const error = await res?.json();
                console.log(error);
                if ('detail' in error) {
                    console.log("error", error);
                    // toast.error(error.detail);
                    responseMessage.error = { content: error.detail };
                } else {
                    console.log("error", error);
                    // toast.error(error.error);
                    responseMessage.error = { content: error.error };
                }
            } else {
                let provider = model?.owned_by === 'openai' ? 'OpenAI' : 'Ollama';
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
                    content: `Oops! No text generated from Ollama, Please try again.`
                };

            }
            responseMessage.done = true;
            // messages = messages;
        }

        setStopResponseFlag(false);

        let lastSentence = extractSentencesForAudio(responseMessage.content)?.at(-1) ?? '';
        if (lastSentence) {
            eventTarget.dispatchEvent(
                new CustomEvent('chat', {
                    detail: { id: responseMessageId, content: lastSentence }
                })
            );
        }
        eventTarget.dispatchEvent(
            new CustomEvent('chat:finish', {
                detail: {
                    id: responseMessageId,
                    content: responseMessage.content
                }
            })
        );

        // scroll to bottom here later ======       
        console.log("Section 1");
        if (_messages?.length == 2 && _messages?.at(1).content !== '' && selectedModels?.[0] === model.id) {
            console.log("section 1 Called");
            // navigate(`/chat/${chatId}`);
            window.history.replaceState(history.state, '', `/chat/${chatId}`);
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
        if (settings?.title?.auto ?? true) {
            const title = await generateTitle(
                localStorage.token,
                selectedModels?.[0],
                userPrompt,
                chatId
            ).catch((error) => {
                console.error(error);
                return 'New Chat';
            });

            return title;
        } else {
            return `${userPrompt}`;
        }
    };

    const setChatTitle = async (_chatId: any, _title: string) => {


        // if ((_chatId === chatId && settings?.saveChatHistory) ?? true) {
        let payload = {
            token: localStorage.token,
            id: _chatId,
            chat: {
                title: _title
            }
        }
        await updateChatByIdMutation(payload);


        // await chats.set(await getChatList(localStorage.token, $currentChatPage));

        // }
    };

    //   chat completed handler function called inside sendPromptOllama
    const chatCompletedHandler = async (
        chatId,
        modelId,
        responseMessageId,
        messages,
        history
    ) => {
        // await mermaid.run({
        // 	querySelector: '.mermaid'
        // });
console.log("chat completed handler function called",chatId);
        const res = await chatCompleted(localStorage.token, {
            model: modelId,
            messages: messages.map((m) => ({
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

        console.log("response after chat Complete handler function", res);
        if (res !== null) {
            // Update chat history with the new messages
            for (const message of res.messages) {
                history.messages[message.id] = {
                    ...history.messages[message.id],
                    ...(history.messages[message.id].content !== message.content
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
                        files: [],
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
        },
    });

    let chat = {
        chat: {
            messages,
            history,
        },
    };
    console.log(chat);
    return {
        chatResponse: SingleChatData ?? chat,
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
        setHistory,
        AllModelList,
        handleSubmit,
        createNewChatMutation,

    }
};

export default useChat;