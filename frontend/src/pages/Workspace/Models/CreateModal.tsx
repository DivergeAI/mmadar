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
  Slider,
  Switch,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import UniversalButton from "../../../components/common/UniversalButton";
import TextFieldContainer from "../../../components/common/TextFieldContainer";
import Text from "../../../components/common/Text";
import { Add, Check, Close, Key } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TransparentSlider from "../../../components/Workspace/TransparentSlider";
import CustomSwitch from "../../../components/common/CustomSwitch";
import AddTags from "../../../components/common/AddTags";

const CreateModal = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isPromptSuggestion, setIsPromptSuggestion] = useState<boolean>(true);
  const [isAdvancePrompt, setIsAdvancePrompt] = useState<boolean>(false);
  const [promptSuggestion, setPromptSuggestion] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [isJSONPreview, setIsJSONPreview] = useState<boolean>(false);
  const [advancedPromptValues, setAdvancedPromptValues] = useState<{
    seed: number;
    stopSequence: string;
    temperature: number;
    mirostat: number;
    mirostatEta: number;
    mirostatTau: number;
    topK: number;
    topP: number;
    minP: number;
    frequencyPenalty: number;
    repeatLastN: number;
    tfsZ: number;
    contextLength: number;
    batchSize: number;
    tokenToKeep: number;
    maxTokens: number;
    useMmap: boolean;
    useMlock: boolean;
    useThread: boolean;
    customStates: {
      [key: string]: boolean;
    };
  }>(
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

  const AdvanceParamWrapper = ({ label, keyName, children }: { label: string, keyName: string, children: React.ReactNode }) => {
    const isCustom = advancedPromptValues.customStates[keyName];

    return (
      <Fragment>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="400" sx={{ lineHeight: "1rem" }}>
            {label}
          </Text>
          <UniversalButton
            label={isCustom ? "Custom" : "Default"}
            onClick={() =>
              handleAdvancedPromptChange(
                keyName,
                advancedPromptValues[keyName],
                !isCustom
              )
            }
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

        {isCustom && <Box>{children}</Box>}
      </Fragment>
    );
  };
  const handleAdvancedPromptChange = (
    key: string,
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

  const ADVANCE_PROMPT_VIEW = [
    {
      label: "Seed",
      keyName: "seed",
      children: (
        <TextField
          value={advancedPromptValues.seed}
          onChange={(e) => handleAdvancedPromptChange("seed", e.target.value)}
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& fieldset": {
              border: "none !important",
            },
          }}
        />
      ),
    },
    {
      label: "Stop Sequence",
      keyName: "stopSequence",
      children: (
        <TextField
          value={advancedPromptValues.stopSequence}
          onChange={(e) =>
            handleAdvancedPromptChange("stopSequence", e.target.value)
          }
          variant="outlined"
          placeholder="Enter stop sequence"
          size="small"
          fullWidth
          sx={{
            "& fieldset": {
              border: "none !important",
            },
          }}
        />
      ),
    },
    {
      label: "Temperature",
      keyName: "temperature",
      children: (
        <TransparentSlider
          value={advancedPromptValues.temperature}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("temperature", value)
          }
        />
      ),
    },
    {
      label: "Mirostat",
      keyName: "mirostat",
      children: (
        <TransparentSlider
          value={advancedPromptValues.mirostat}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("mirostat", value)
          }
        />
      ),
    },
    {
      label: "Mirostat Eta",
      keyName: "mirostatEta",
      children: (
        <TransparentSlider
          value={advancedPromptValues.mirostatEta}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("mirostatEta", value)
          }
        />
      ),
    },
    {
      label: "Mirostat Tau",
      keyName: "mirostatTau",
      children: (
        <TransparentSlider
          value={advancedPromptValues.mirostatTau}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("mirostatTau", value)
          }
        />
      ),
    },
    {
      label: "Top K",
      keyName: "topK",
      children: (
        <TransparentSlider
          value={advancedPromptValues.topK}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("topK", value)
          }
        />
      ),
    },
    {
      label: "Top P",
      keyName: "topP",
      children: (
        <TransparentSlider
          value={advancedPromptValues.topP}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("topP", value)
          }
        />
      ),
    },
    {
      label: "Min P",
      keyName: "minP",
      children: (
        <TransparentSlider
          value={advancedPromptValues.minP}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("minP", value)
          }
        />
      ),
    },

    {
      label: "Frequency Penalty",
      keyName: "frequencyPenalty",
      children: (
        <TransparentSlider
          value={advancedPromptValues.frequencyPenalty}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("frequencyPenalty", value)
          }
        />
      ),
    },
    {
      label: "Repeat Last N",
      keyName: "repeatLastN",
      children: (
        <TransparentSlider
          value={advancedPromptValues.repeatLastN}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("repeatLastN", value)
          }
        />
      ),
    },
    {
      label: "Tfs Z",
      keyName: "tfsZ",
      children: (
        <TransparentSlider
          value={advancedPromptValues.tfsZ}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("tfsZ", value)
          }
        />
      ),
    },
    {
      label: "Context Length",
      keyName: "contextLength",
      children: (
        <TransparentSlider
          value={advancedPromptValues.contextLength}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("contextLength", value)
          }
        />
      ),
    },
    {
      label: "Batch Size (num_batch)",
      keyName: "batchSize",
      children: (
        <TransparentSlider
          value={advancedPromptValues.batchSize}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("batchSize", value)
          }
        />
      ),
    },
    {
      label: "Token To Keep On Context Refresh (num_keep)",
      keyName: "tokenToKeep",
      children: (
        <TransparentSlider
          value={advancedPromptValues.tokenToKeep}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("tokenToKeep", value)
          }
        />
      ),
    },
    {
      label: "Max Tokens (num_predict)",
      keyName: "maxTokens",
      children: (
        <TransparentSlider
          value={advancedPromptValues.maxTokens}
          onChange={(e: Event, value: number | number[]) =>
            handleAdvancedPromptChange("maxTokens", value)
          }
        />
      ),
    },

    {
      label: "use_mmap (Ollama)",
      keyName: "useMmap",
      children: (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500" color="grey.700">
            {advancedPromptValues?.useMmap ? "Enabled" : "Disabled"}
          </Text>

          <CustomSwitch
            value={advancedPromptValues?.useMmap}
            onChange={(e) =>
              handleAdvancedPromptChange("useMmap", e.target.checked)
            }
          />
        </Stack>
      ),
    },
    {
      label: "use_mlock (Ollama)",
      keyName: "useMlock",
      children: (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500" color="grey.700">
            {advancedPromptValues?.useMlock ? "Enabled" : "Disabled"}
          </Text>

          <CustomSwitch
            value={advancedPromptValues?.useMlock}
            onChange={(e) =>
              handleAdvancedPromptChange("useMlock", e.target.checked)
            }
          />
        </Stack>
      ),
    },
    {
      label: "use_thread (Ollama)",
      keyName: "useThread",
      children: (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize=".75rem" fontWeight="500" color="grey.700">
            {advancedPromptValues?.useThread ? "Enabled" : "Disabled"}
          </Text>

          <CustomSwitch
            value={advancedPromptValues?.useThread}
            onChange={(e) =>
              handleAdvancedPromptChange("useThread", e.target.checked)
            }
          />
        </Stack>
      ),
    },
  ];

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

        {isAdvancePrompt && (
          <Stack direction={"column"} gap={1.5}>
            {ADVANCE_PROMPT_VIEW.map((param, index) => (
              <AdvanceParamWrapper
                key={index}
                label={param.label}
                keyName={param.keyName}
              >
                {param.children}
              </AdvanceParamWrapper>
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
