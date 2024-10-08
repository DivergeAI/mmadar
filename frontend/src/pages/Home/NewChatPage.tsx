import { Box, Button, Fade, Grow, Icon, Stack, useTheme } from "@mui/material";
import Text from "../../components/common/Text";
import { ArrowUpward } from "@mui/icons-material";
import Image  from    "../../assets/favicon.png"
import { useEffect } from "react";


type NewChatPageProps = {
  title : string[]
  content : string
}

type Props ={
  promptSuggestions : NewChatPageProps[],
  setPrompt : (value:string) => void
}

const NewChatPage = ({promptSuggestions,setPrompt} : Props) => {
  const theme = useTheme();

  useEffect(() => {
    document.title = "Maadar";
  }, []);
  return (

    <Stack direction={'column'} height={"100%"} gap={2} textAlign={'start'} justifyContent={'center'}>
      <img src={Image} alt="logo" width={'44px'} height={'44px'}/>
      <Grow in={true} timeout={1000}
        style={{ transformOrigin: '0 0 0' }}
      >
        <Box>

          <Text fontSize="30px" fontWeight="600">
            Hello, Welcome to Chat App
          </Text>

          <Fade in={true} timeout={2000}>
            <Box>
              <Text fontSize="30px" fontWeight="500" color={theme.palette.grey[500]}>
                How can I help you today?
              </Text>
            </Box>
          </Fade>
        </Box>
      </Grow>

      <Grow in={true} timeout={2000}
        style={{ transformOrigin: '0 0 0' }}

      >
        <Stack>
          <Text fontSize="14px" fontWeight="500" color={theme.palette.grey[500]}>
            Suggested
          </Text>

          {/* SUggested question cards */}
          <Box display={'flex'}
            overflow={'auto'}
            gap={2}
          >
            {promptSuggestions?.map((prompt:NewChatPageProps, index:number) => (
              <Stack
              component={Button}
              onClick={() => setPrompt(prompt.content)}
                key={index}
                p={2.3}
                bgcolor={theme.palette.grey[200]}
                borderRadius={"1.5rem"}
                minWidth={"16rem"}
                height={"9rem"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                textAlign={"start"}
                textTransform={"none"}
                justifyContent={"space-between"}
                gap={2}
                disableRipple
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.palette.grey[600],
                    '.arrow-up' :{
                      color: theme.palette.grey[900]
                    }
                  },
                }}
              >
                <div>
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    color={theme.palette.grey[900]}
                  >
                   {prompt.title[0]}
                  </Text>

                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color={theme.palette.grey[900]}
                    lines={2}
                  >
                   {prompt.title[1]}
                  </Text>
                </div>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    color={theme.palette.grey[500]}
                  >
                    Prompt{" "}
                  </Text>
                  <Icon fontSize="small" >
                    <ArrowUpward
                    className="arrow-up"
                      sx={{
                        color: theme.palette.grey[500],
                        "&:hover": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                  </Icon>
                </Stack>
              </Stack>
            ))}

          </Box>
        </Stack>
      </Grow>
    </Stack>

  );
};

export default NewChatPage;
