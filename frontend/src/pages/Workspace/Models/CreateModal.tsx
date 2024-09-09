import {
  Box,
  Stack,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  Icon,
  useTheme,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import  {  useState } from "react";
import UniversalButton from "../../../components/common/UniversalButton";
import TextFieldContainer from "../../../components/common/TextFieldContainer";
import Text from "../../../components/common/Text";
import { Add, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddTags from "../../../components/common/AddTags";
import { AdvanceModel } from "../../../types/createModel";
import AdvancePrompt, { renderPromptChildren } from "../../../components/Workspace/AdvancePrompt";


type PromptConfig = {
  label: string;
  keyName: string;
  type: 'text' | 'slider' | 'switch'; // define types of input controls
  sliderProps?: any; // any additional props for sliders
  textProps?: any;   // any additional props for text fields
  switchProps?: any; // any additional props for switches
};


const CreateModal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isPromptSuggestion, setIsPromptSuggestion] = useState<boolean>(true);
  const [isAdvancePrompt, setIsAdvancePrompt] = useState<boolean>(false);
  const [promptSuggestion, setPromptSuggestion] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [isJSONPreview, setIsJSONPreview] = useState<boolean>(false);
  const [advancedPromptValues, setAdvancedPromptValues] = useState<AdvanceModel>(
    {
      seed: 0,
      stopSequence: "",
      temperature: 0,
      mirostat: 0,
      mirostatEta: 0,
      mirostatTau: 0,
      topK: 0,
      topP: 0,
      minP: 0,
      frequencyPenalty: 0,
      repeatLastN: 0,
      tfsZ: 0,
      contextLength: 0,
      batchSize: 0,
      tokenToKeep: 0,
      maxTokens: 0,
      useMmap: false,
      useMlock: false,
      useThread: false,
      customStates: {
        seed: false,
        stopSequence: false,
        temperature: false,
        mirostat: false,
        mirostatEta: false,
        mirostatTau: false,
        topK: false,
        topP: false,
        minP: false,
        frequencyPenalty: false,
        repeatLastN: false,
        tfsZ: false,
        contextLength: false,
        batchSize: false,
        tokenToKeep: false,
        maxTokens: false,
        useMmap: false,
        useMlock: false,
        useThread: false,
      },
    }
  );

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

  const handleAdvancedPromptChange = (
    key: number | string,
    value: any,
    isCustom?: boolean
  ) => {
    setAdvancedPromptValues((prev) => ({
      ...prev,
      [key]: value,
      customStates: {
        ...prev.customStates,
        [key]: isCustom !== undefined ? isCustom : prev.customStates[key],
      },
    }));
  };

  const ADVANCE_PROMPT_VIEW: PromptConfig[] = [
    { label: "Seed", keyName: "seed", type: "text", textProps: { type: "number" } },
    { label: "Stop Sequence", keyName: "stopSequence", type: "text", textProps: { placeholder: "Enter stop sequence" } },
    { label: "Temperature", keyName: "temperature", type: "slider" },
    { label: "Mirostat", keyName: "mirostat", type: "slider" },
    { label: "Mirostat Eta",keyName: "mirostatTau", type: "slider" },
    { label: "Mirostat Tau",keyName: "mirostatEta", type: "slider" },
    { label: "Top K",keyName: "topK", type: "slider" },
    { label: "Top p",keyName: "topP", type: "slider" },
    { label: "Min p",keyName: "minP", type: "slider" },
    { label: "Frequency Penalty", keyName: "frequencyPenalty",type: "slider" },
    { label: "Repeat Last N", keyName: "repeatLastN",type: "slider" },
    { label: "Tfs Z", keyName: "tfsZ",type: "slider" },
    { label: "Context Length", keyName: "contextLength",type: "slider" },
    { label: "Batch Size (num_batch)", keyName: "batchSize",type: "slider" },
    { label: "Token To Keep On Context Refresh (num_keep)", keyName: "tokenToKeep",type: "slider" },
    { label: "Max Tokens (num_predict)", keyName: "maxTokens",type: "slider" },
    { label: "use_mmap (Ollama)", keyName: "useMmap", type: "switch" },
    { label: "use_mlock (Ollama)", keyName: "useMlock", type: "switch" },
    { label: "num_thread (Ollama)", keyName: "useMlock", type: "slider" },
  ]  

  return (
    <Box>
      {/* back button */}
      <UniversalButton
        label="Back"
        variant="text"
        onClick={() => navigate(-1)}
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
              '& .MuiInputBase-root': {
                  padding: '0 !important',
                  '& textarea': {
                      padding: '1rem',
                      resize: 'vertical',
                      fontFamily: 'system-ui',
                      fontSize: '.87rem',
                      fontWeight: '400',
                  }
              },
              '& :focus': {
                  borderColor: 'inherit !important'
              },
              '& :hover': {
                  borderColor: 'inherit !important'
              }
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
              '& .MuiInputBase-root': {
                  padding: '0 !important',
                  '& textarea': {
                      padding: '1rem',
                      resize: 'vertical',
                      fontFamily: 'system-ui',
                      fontSize: '.87rem',
                      fontWeight: '400',
                      lineHeight: '1.1rem'
                  }
              },
              '& :focus': {
                  borderColor: 'inherit !important'
              },
              '& :hover': {
                  borderColor: 'inherit !important'
              }
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

        {isAdvancePrompt && (
          <Stack direction={"column"} gap={1.2}>
            {/* {ADVANCE_PROMPT_VIEW.map((param, index) => (
              <AdvanceParamWrapper
                key={index}
                label={param.label}
                keyName={param.keyName}
              >
                {param.children}
              </AdvanceParamWrapper>
            ))} */}
                  {ADVANCE_PROMPT_VIEW.map(({ label, keyName, type, ...props }) => (
        <AdvancePrompt
          key={keyName}
          label={label}
          keyName={keyName}
          value={advancedPromptValues[keyName]}
          isCustom={advancedPromptValues.customStates[keyName]}
          onChange={handleAdvancedPromptChange}
        >
          {renderPromptChildren(type, advancedPromptValues[keyName], keyName, handleAdvancedPromptChange, props)}
        </AdvancePrompt>
      ))}

          </Stack>
        )}
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

        {/* knowledge */}
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

        {/* capabilites */}
        <Box>
          <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
            Capabilities
          </Text>
          <FormControlLabel
            control={<Checkbox checked color="secondary" />}
            label="Capability 1"
            // sx={{ ml: 2 }} // Optional: Add margin to align the label
          />
        </Box>

        {/* Add Tags */}
        <AddTags tags={tags} setTags={setTags} />

        {/* JSON Preview */}
        <Box width={"100%"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={1}
          >
            <Text
              fontSize=".875rem"
              fontWeight="600"
              color="grey.500"
              sx={{ lineHeight: "1rem" }}
            >
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

          {isJSONPreview && (
            <Box
              width={"100%"}
              sx={{
                resize: "vertical",
                // backgroundColor: 'grey.100',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: "8px",
                padding: ".375rem .75rem",
                overflow: "auto",
                "& pre": {
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontSize: ".875rem",
                  color: "grey.500",
                },
              }}
            >
              <pre>
                {JSON.stringify(
                  {
                    name: "Model Name",
                    modelId: "Model ID",
                    description: "Model Description",
                    systemPrompt: "Model System Prompt",
                    promptSuggestion: promptSuggestion,
                    tags: tags,
                    // params : advancedPromptValues
                  },
                  null,
                  2
                )}
              </pre>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateModal;
