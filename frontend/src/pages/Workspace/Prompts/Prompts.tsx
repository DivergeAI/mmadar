import React, { Fragment } from 'react';
import Text from '../../../components/common/Text';
import { Box, Divider, Icon, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Add } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';
import CreateButtonLink from '../../../components/Workspace/CreateButtonLink';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';

const Prompts = () => {
    const theme =useTheme();
    const navigate = useNavigate()
    return (
        <Fragment>
  {/* Title */}
  <Text fontSize="1.12rem" fontWeight="600">
            Prompts
          </Text>

          {/* Search */}

          <Box 
          mb={0}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search prompts"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <Icon fontSize="small">
                        <Search />
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton
                    onClick={() => navigate('create')}
                      sx={{
                        border: `1px solid ${theme.palette.grey[400]}`,
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: theme.palette.grey[300],
                          borderColor: theme.palette.grey[400],
                        },
                      }}
                    >
                      <Icon fontSize="small">
                        <Add />
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none !important",
                  padding: 0,
                },
                "& fieldset": {
                  border: "0",
                },
              }}
            />
                      <Divider sx={{
                        mt: '.5rem'
                      }}/>     

          </Box>

          {/* Import & Export Button */}
          <Stack direction="row" gap={1} justifyContent={"end"}>
            <UniversalButton
              label={"Import Models"}
              width={"fit-content"}
              height={"fit-content"}
              fontSize={"small"}
              textColor="common.black"
              sx={{
                fontWeight: "500",
                backgroundColor: "background.paper",
                border: "none ",
                borderRadius: ".75rem",
                padding: "0.375rem .75rem",
                lineHeight: "1",
                "&:hover": {
                  backgroundColor: theme.palette.grey[400],
                },
              }}
              // startIcon  = {<Icon>
              //     <ImportExport />
              // </Icon> }
            />
            <UniversalButton
              label={"Export Models"}
              width={"fit-content"}
              height={"fit-content"}
              fontSize={".75rem"}
              textColor="common.black"
              sx={{
                fontWeight: "500",
                backgroundColor: "background.paper",
                border: "none ",
                borderRadius: ".75rem",
                padding: "0.375rem .75rem",
                lineHeight: "1",
                "&:hover": {
                  backgroundColor: theme.palette.grey[400],
                },
              }}
              // startIcon  = {<Icon>
              //     <ImportExport />
              // </Icon> }
            />
          </Stack>

<Stack my={4} gap={2}>
<Text 
fontSize="1.17rem"
fontWeight="600">
    Made by Diverge Community
</Text>

<CreateButtonLink
path="/"
title="Discover a model"
description="Discover, download and explore model presets"
/>
</Stack>

{/* <Outlet /> */}

             </Fragment>
    );
};

export default Prompts;