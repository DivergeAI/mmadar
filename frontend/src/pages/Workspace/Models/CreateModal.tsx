import {
    Box,
    Menu,
    Stack,
    TextField,
    MenuItem,
    TextareaAutosize,
    Divider,
    InputAdornment,
    IconButton,
    Icon,
    useTheme,
    Checkbox,
    FormControlLabel,
    Chip,
} from "@mui/material";
import React from "react";
import UniversalButton from "../../../components/common/UniversalButton";
import TextFieldContainer from "../../../components/common/TextFieldContainer";
import Text from "../../../components/common/Text";
import { Add, Check, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CreateModal = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [isPromptSuggestion, setIsPromptSuggestion] =
        React.useState<boolean>(true);
    const [isAdvancePrompt, setIsAdvancePrompt] = React.useState<boolean>(false);
    const [promptSuggestion, setPromptSuggestion] = React.useState<string[]>([""]);
    const [isAddTag, setIsAddTag] = React.useState<boolean>(false);
    const [tags, setTags] = React.useState<string[]>([]);
    const [tag, setTag] = React.useState<string>('')
    const [isJSONPreview, setIsJSONPreview] = React.useState<boolean>(false);


    const handleAddMoreSuggestion = () => {
        if (promptSuggestion[promptSuggestion.length - 1] === "") return;
        setPromptSuggestion([...promptSuggestion, ""]);
    };

    const handleSuggestionChange = (index: number, value: string) => {
        const newSuggestions = [...promptSuggestion];
        newSuggestions[index] = value;
        setPromptSuggestion(newSuggestions);
    };

    const handleRemoveSuggestion = (index: number) => {
        const newSuggestions = promptSuggestion.filter((_, i) => i !== index);
        setPromptSuggestion(newSuggestions);
    };

    return (
        <Box>
            {/* back button */}
            <UniversalButton 
            label="Back" 
            variant="text" 
            onClick={()=> navigate(-1)}
            sx={{
                padding: "0",
                minWidth: "auto",
                height: "auto",
                fontSize: ".75rem",
                fontWeight: "600",
                lineHeight: "1rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "grey.800",
                border: "none",
            }}
            />

            {/* Create Form */}
            <Stack
                direction={"column"}
                maxWidth={"42rem"}
                mx={"auto"}
                mt={4}
                mb={10}
                spacing={2}
            >
                {/* upload Button */}
                <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                    <UniversalButton
                        label="Upload"
                        variant="text"
                        sx={{
                            alignSelf: "center",
                        }}
                    />
                </Box>

                {/* form fields */}
                <Stack direction={"row"} gap={2}>
                    <TextFieldContainer required label="Name">
                        <TextField
                            variant="outlined"
                            placeholder="Name your model"
                            size="small"
                            fullWidth
                        />
                    </TextFieldContainer>

                    <TextFieldContainer required label="Model ID">
                        <TextField
                            variant="outlined"
                            placeholder="Add a model id"
                            size="small"
                            fullWidth
                        />
                    </TextFieldContainer>
                </Stack>

                <TextFieldContainer label="Description">
                    <TextField
                        variant="outlined"
                        placeholder="Add a short description about what the model does"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            resize: "vertical",
                        }}
                    />
                </TextFieldContainer>

                <Divider />

                {/* Model Params */}
                <TextFieldContainer label="System Prompt">
                    <TextField
                        variant="outlined"
                        placeholder="Write your model system prompt here e.g.) You are Mario from Super Mario Bros, acting as an assistant"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            resize: "vertical",
                        }}
                    />
                </TextFieldContainer>

                {/* Advanced Prompts */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text fontSize=".75rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Advanced Prompts
                    </Text>
                    <UniversalButton
                        label={isAdvancePrompt ? "Hide" : "Show"}
                        onClick={() => setIsAdvancePrompt(!isAdvancePrompt)}
                        sx={{
                            padding: "0",
                            minWidth: "auto",
                            height: "auto",
                            fontSize: ".75rem",
                            fontWeight: "400",
                            lineHeight: "1rem",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            color: "grey.800",
                            border: "none",
                        }}
                    />
                </Stack>
                <Divider />

                {/* Prompt suggestion */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Prompt Suggestion
                    </Text>
                    <Stack direction={"row"} gap={1}>
                        <UniversalButton
                            label={isPromptSuggestion ? "Custom" : "Default"}
                            onClick={() => setIsPromptSuggestion(!isPromptSuggestion)}
                            sx={{
                                padding: "0",
                                minWidth: "auto",
                                height: "auto",
                                fontSize: ".75rem",
                                fontWeight: "400",
                                backgroundColor: "transparent",
                                color: "grey.800",
                                border: "none",
                            }}
                        />

                        {isPromptSuggestion && (
                            <IconButton
                                sx={{
                                    padding: "0",
                                    fontSize: ".75rem",
                                    fontWeight: "400",
                                    lineHeight: "1rem",
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    color: "grey.800",
                                    border: "none",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                                onClick={handleAddMoreSuggestion}
                            >
                                <Icon fontSize="small">
                                    <Add />
                                </Icon>
                            </IconButton>
                        )}
                    </Stack>
                </Stack>

                {isPromptSuggestion && promptSuggestion?.length > 0
                    ? promptSuggestion.map((suggestion, index) => (
                        <TextField
                            key={index}
                            placeholder="Write a prompt suggestion (e.g Who are you?)"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={suggestion}
                            onChange={(e) => handleSuggestionChange(index, e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box display={"flex"}>
                                            <Divider
                                                orientation="vertical"
                                                flexItem
                                                variant="fullWidth"
                                            />

                                            <IconButton
                                                sx={{ ml: 1 }}
                                                onClick={() => handleRemoveSuggestion(index)}
                                            >
                                                <Icon fontSize="small">
                                                    <Close />
                                                </Icon>
                                            </IconButton>
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))
                    : isPromptSuggestion && (
                        <Text
                            sx={{
                                fontSize: ".8rem",
                                alignSelf: "center",
                            }}
                        >
                            No prompt suggestion
                        </Text>
                    )}

                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Knowledge
                    </Text>
                    <Text
                        fontSize=".75rem"
                        fontWeight="400"
                        sx={{ lineHeight: "1rem", my: 1 }}
                    >
                        To add documents here, upload them to the "Documents" workspace
                        first.
                    </Text>

                    <UniversalButton
                        label="Select Documents"
                        variant="outlined"
                        textColor="grey.900"
                        sx={{
                            borderRadius: "50px",
                            width: "fit-content",
                            "&:hover": {
                                border: `1px solid ${theme.palette.grey[700]}`,
                                backgroundColor: "grey.300",
                            },
                        }}
                    />
                </Box>
                {/* tools */}
                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Tools
                    </Text>
                    <Text fontSize=".75rem" fontWeight="400" sx={{ lineHeight: "1rem" }}>
                        To select toolkits here, add them to the "Tools" workspace first.
                    </Text>
                </Box>

                {/* filters */}
                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Filters
                    </Text>
                    <Text fontSize=".75rem" fontWeight="400" sx={{ lineHeight: "1rem" }}>
                        To select filters here, add them to the "Functions" workspace first.
                    </Text>
                </Box>

                {/* Actions */}
                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Actions
                    </Text>
                    <Text fontSize=".75rem" fontWeight="400" sx={{ lineHeight: "1rem" }}>
                        To select actions here, add them to the "Functions" workspace first.
                    </Text>
                </Box>

                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Capabilities
                    </Text>
                    <FormControlLabel
                        control={<Checkbox checked />}
                        label="Capability 1"
                        sx={{ ml: 2 }} // Optional: Add margin to align the label
                    />
                </Box>

                {/* Add Tags */}
                <Box>
                    <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
                        Tags
                    </Text>

                    <Stack direction={"row"} alignItems={"center"} gap={1} mt={1}>
                        {tags?.map((tag, index) => (
                            <Chip
                                size="small"
                                label={tag}
                                key={index}
                                deleteIcon={<Close sx={{
                                    width: '0.8rem',
                                    height: '0.8rem',
                                    color: 'grey.800',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'grey.800'
                                    }
                                }} />}
                                onDelete={() => {
                                    const newTags = tags.filter((_, i) => i !== index)
                                    setTags(newTags)
                                }}
                            />
                        ))}
                        <IconButton
                            onClick={() => setIsAddTag(!isAddTag)}
                            sx={{
                                border: "1px dashed #DDDDDD",
                                borderRadius: "50px",
                                width: "fit-content",
                                height: "fit-content",
                                padding: "0",
                                "&:hover": {
                                    border: "1px dashed #DDDDDD",
                                },
                            }}
                        >
                            <Icon fontSize="small">
                                <Add
                                    sx={{
                                        rotate: isAddTag ? "45deg" : '',
                                        transition: "all 0.3s",
                                        width: "1rem",
                                        height: "1rem",
                                    }}
                                />
                            </Icon>
                        </IconButton>
                        {isAddTag &&
                            <TextField
                                name="tag"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Add a tag"
                                variant="outlined"
                                size="small"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => {
                                                    setTags([...tags, tag])
                                                    setIsAddTag(false)
                                                    setTag('')
                                                }
                                                }
                                                sx={{
                                                    padding: "0",
                                                    // fontSize: ".75rem",
                                                    fontWeight: "400",
                                                    lineHeight: "1rem",
                                                    cursor: "pointer",
                                                    backgroundColor: "transparent",
                                                    color: "grey.800",
                                                    border: "none",
                                                    "&:hover": {
                                                        backgroundColor: "transparent",
                                                    },
                                                }}>
                                                <Icon fontSize="small">
                                                    <Check sx={{
                                                        width: "1rem",
                                                        height: "1rem",
                                                    }} />
                                                </Icon>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                                sx={{
                                    width: "6.5rem",
                                    "& .MuiOutlinedInput-root": {
                                        border: "none !important",
                                    },
                                    "& fieldset": {
                                        border: "none !important",
                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '0 !important',
                                    }
                                }}

                            />}


                        {tags?.length === 0 && !isAddTag ? <Text fontSize=".75rem" sx={{
                            ml: 1,
                        }}>Add Tags</Text> : null}
                    </Stack>
                </Box>

                {/* JSON Preview */}
<Box 
width={'100%'}>

                <Stack direction={"row"}  alignItems={"center"} justifyContent={'space-between'} mb={1}>
                    <Text fontSize=".875rem" fontWeight="600" color="grey.500" sx={{ lineHeight: "1rem" }}>
                        JSON Preview
                    </Text>
                    <UniversalButton
                        label={isJSONPreview ? "Hide" : "Show"}
                        onClick={() => setIsJSONPreview(!isJSONPreview)}
                        sx={{
                            padding: "0",
                            minWidth: "auto",
                            height: "auto",
                            fontSize: ".75rem",
                            fontWeight: "400",
                            lineHeight: "1rem",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            color: "grey.500",
                            border: "none",
                        }}
                    />

                    
                    </Stack>

                    {isJSONPreview && <Box 
                    width={'100%'}
                    sx={{
                        resize : 'both',
                        // backgroundColor: 'grey.100',
                        border : `1px solid ${theme.palette.grey[300]}`,
                        borderRadius: '8px',
                        padding :'.375rem .75rem',
                        overflow: 'auto',
                        '& pre': {
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            fontSize: '.875rem',
                            color: 'grey.500',
                    }}
                }
                    >
                        <pre>
                            {JSON.stringify({
                                name: "Model Name",
                                modelId: "Model ID",
                                description: "Model Description",
                                systemPrompt: "Model System Prompt",
                                promptSuggestion: promptSuggestion,
                                tags: tags,
                            }, null, 2)}

                        </pre>
                    </Box>}
                    </Box>

            </Stack>
        </Box>
    );
};

export default CreateModal;
