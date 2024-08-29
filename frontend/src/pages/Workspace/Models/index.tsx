import {
  Box,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React, { Fragment } from "react";
import Text from "../../../components/common/Text";
import { Add, ImportExport, Search } from "@mui/icons-material";
import { useNavigate, useLocation, NavLink, Outlet } from "react-router-dom";
import Model from "../../../components/Workspace/Model";

import UniversalButton from "../../../components/common/UniversalButton";
import CreateButtonLink from "../../../components/Workspace/CreateButtonLink";

const Models = () => {
  const theme = useTheme();
  const location = useLocation();

  // Determine if the current path is the create page
  const isCreatePage = location.pathname === "/workspace/models/create";

  return (
    <Fragment>
      {!isCreatePage && (
        <>
          {/* Title */}
          <Text fontSize="1.12rem" fontWeight="600">
            Models
          </Text>

          {/* Search */}
          <Box mb={1}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search models"
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
                  <InputAdornment position="end">
                    <IconButton
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
          </Box>

          <Divider />

          {/* Create Model Button */}
          <CreateButtonLink
            path="create"
            title="      Create a model"
            description=" Customize models for a specific purpose"
          />

          <Divider />

          {/* Models List */}
          {[1].map((model, index) => (
            <Model model={model} />
          ))}

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

        </>
      )}
      
      <Outlet />
    </Fragment>
  );
};

export default Models;
