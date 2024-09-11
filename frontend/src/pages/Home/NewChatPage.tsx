import { Box, Fade, Grow, Icon, Stack, useTheme } from "@mui/material";
import Text from "../../components/common/Text";
import { ArrowUpward } from "@mui/icons-material";




const NewChatPage = () => {
  const theme = useTheme();
  return (

    <Stack direction={'column'} height={"100%"} gap={2} textAlign={'start'} justifyContent={'center'}>
      <img src="../../assets/favicon.png" alt="logo" />
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
            {[...Array(10)].map((_, index) => (
              <Stack
                key={index}
                p={2.3}
                bgcolor={theme.palette.grey[200]}
                borderRadius={"1.5rem"}
                minWidth={"16rem"}
                height={"9rem"}
                gap={2}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: theme.palette.grey[600],
                  },
                }}
              >
                <div>
                  <Text
                    fontSize="16px"
                    fontWeight="600"
                    color={theme.palette.grey[900]}
                  >
                    How to create a new chat?
                  </Text>

                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color={theme.palette.grey[500]}
                    lines={2}
                  >
                    Explain options trading in simple terms if I'm familiar with
                    buying and selling stocks.
                  </Text>
                </div>

                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Text
                    fontSize="14px"
                    fontWeight="500"
                    color={theme.palette.grey[500]}
                  >
                    Prompt{" "}
                  </Text>
                  <Icon fontSize="small">
                    <ArrowUpward
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
