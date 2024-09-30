import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Text from "../../../components/common/Text";
import UniversalButton from "../../../components/common/UniversalButton";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.min.css';
import { copyToClipboard } from "../../../utils/functions";

const CodeBlock = ({ lang, code, id }: any) => {
    const [executing, setExecuting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
    const [stdout, setStdout] = useState<string | null>(null);
    const [stderr, setStderr] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const checkPythonCode = (str: string) => {
        const pythonSyntax = [
            'def ',
            'else:',
            'elif ',
            'try:',
            'except:',
            'finally:',
            'yield ',
            'lambda ',
            'assert ',
            'nonlocal ',
            'del ',
            'True',
            'False',
            'None',
            ' and ',
            ' or ',
            ' not ',
            ' in ',
            ' is ',
            ' with '
        ];

        return pythonSyntax.some((syntax) => str.includes(syntax));
    };

    const handleCopyText = async(text:string)=>{
        const res = await copyToClipboard(text);
            if(res){
                setCopied(true)
                console.log("message copied")
            }
        }

    useEffect(() => {
        const highlightCode = () => {
            const highlightedCode = hljs.highlightAuto(code, hljs.getLanguage(lang)?.aliases).value || code;
            setHighlightedCode(highlightedCode);
        };

        const debounceTimeout = setTimeout(highlightCode, 10);
        return () => clearTimeout(debounceTimeout);
    }, [code, lang]);

    return (
        <Box
            my={2}
            sx={{
                direction: "ltr",
                                fontFamily: 'monospace  !important',
            }}
        >
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                color={"common.white"}
                px={2}
                fontSize={"0.75rem"}
                sx={{
                    borderTopLeftRadius: '.5rem',
                    borderTopRightRadius: '.5rem',
                    backgroundColor: "#202123",
                }}
            >
                <Box p={1} dangerouslySetInnerHTML={{ __html: lang }} sx={{
                                                    fontFamily: 'monospace  !important',

                }}/>
                <Stack alignItems={"center"} gap={1} direction={"row"}>
                    {(lang?.toLowerCase() === "python" ||
                        lang?.toLowerCase() === "py" ||
                        lang === "") &&
                        checkPythonCode(code)}
                    {executing ? (
                        <Text>Running</Text>
                    ) : (
                        <UniversalButton
                            label={"Run"}
                            backgroundColor="transparent"
                            border="none"
                            sx={{
                                padding: 1,
                                minWidth: "fit-content",
                                color: "common.white",
                                fontSize: "0.75rem",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        />
                    )}
                    <UniversalButton
                    onClick={() => handleCopyText(code)}
                        label={copied ? "Copied" : "Copy"}
                        backgroundColor="transparent"
                        border="none"
                        sx={{
                            padding: 0,
                            minWidth: "fit-content",
                            color: "common.white",
                            fontSize: "0.75rem",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    />
                </Stack>
            </Box>
            <pre
                className="hljs"
                style={{
                    fontFamily: 'monospace  !important',
                    whiteSpace: "pre",
                    fontSize: "1rem",
                    padding: "1rem 1.25rem",
                    overflowX: "auto",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    ...(executing || stdout || stderr || result ? {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    } : {})
                }}
            >       
             <code className={`language-${lang}`} style={{
                whiteSpace: "pre-line",
                lineHeight: "28px",
                fontFamily: 'monospace  !important',
                
                 }}
            >
                    {highlightedCode ? (
                        <div dangerouslySetInnerHTML={{ __html: highlightedCode }}/>
                    ) : (
                        code 
                    )}
                </code>
            </pre>

            <Box id={`plt-canvas-${id}`}
                sx={{
                    backgroundColor: "#202123",
                    color: "common.white",
                    maxWidth: "100%",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                }}
            />
            {executing ? (
                <Box
                    sx={{
                        backgroundColor: "#202123",
                        color: "common.white",
                        padding: "1rem",
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                    }}
                >
                    <Text fontSize="0.75rem" color="grey.500" sx={{ marginBottom: 1 }}>
                        STDOUT/STDERR
                    </Text>
                    <Text fontSize="0.87rem">Running...</Text>
                </Box>
            ) : (
                (stdout || stderr || result) && (
                    <Box
                        sx={{
                            backgroundColor: "#202123",
                            color: "common.white",
                            padding: "1rem",
                            borderBottomLeftRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                        }}
                    >
                        <Text
                            fontSize="0.75rem"
                            color="grey.500"
                            sx={{ marginBottom: 1 }}
                        >
                            STDOUT/STDERR
                        </Text>
                        <Text fontSize="0.87rem">{stdout || stderr || result}</Text>
                    </Box>
                )
            )}

        </Box>
    );
};

export default CodeBlock;
