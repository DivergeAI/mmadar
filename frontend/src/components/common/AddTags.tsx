import { Box, Chip, Icon, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React from 'react';
import Text from './Text';
import { Add, Check, Close } from '@mui/icons-material';

const AddTags = ({tags , setTags}:any) => {
    const [isAddTag, setIsAddTag] = React.useState(false);
    const [tag, setTag] = React.useState("");
    return (
        <Box>
          <Text fontSize=".875rem" fontWeight="600" sx={{ lineHeight: "1rem" }}>
            Tags
          </Text>

          <Stack direction={"row"} alignItems={"center"} gap={1} mt={1}>
            {tags?.map((tag:any, index:any) => (
              <Chip
                size="small"
                label={tag}
                key={index}
                deleteIcon={
                  <Close
                    sx={{
                      width: "0.8rem",
                      height: "0.8rem",
                      color: "grey.800",
                      cursor: "pointer",
                      "&:hover": {
                        color: "grey.800",
                      },
                    }}
                  />
                }
                onDelete={() => {
                  const newTags = tags.filter((_:any, i:any) => i !== index);
                  setTags(newTags);
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
                    rotate: isAddTag ? "45deg" : "",
                    transition: "all 0.3s",
                    width: "1rem",
                    height: "1rem",
                  }}
                />
              </Icon>
            </IconButton>
            {isAddTag && (
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
                          setTags([...tags, tag]);
                          setIsAddTag(false);
                          setTag("");
                        }}
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
                        }}
                      >
                        <Icon fontSize="small">
                          <Check
                            sx={{
                              width: "1rem",
                              height: "1rem",
                            }}
                          />
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
                  "& .MuiInputBase-input": {
                    padding: "0 !important",
                  },
                }}
              />
            )}

            {tags?.length === 0 && !isAddTag ? (
              <Text
                fontSize=".75rem"
                sx={{
                  ml: 1,
                }}
              >
                Add Tags
              </Text>
            ) : null}
          </Stack>
        </Box>
    );
};

export default AddTags;