import UniversalButton from "../common/UniversalButton";
import Text from "../common/Text";
import { Divider, ListItemIcon, MenuItem, Select, Stack, useTheme } from "@mui/material";
import { Check, KeyboardArrowDown } from "@mui/icons-material";
import CustomSwitch from "../common/CustomSwitch";

const AudioSetting = () => {
    const theme = useTheme();
    return (
        <Stack height="100%">
            <Stack
                gap={1}
                height={"100%"}
                flex={"1 1 auto"}
                sx={{
                    overflowY: "auto",
                }}
            >
                <Text
                    fontSize=".87rem"
                    fontWeight="500"
                    sx={{
                        lineHeight: "1.25",
                    }}
                >
                    STT Settings
                </Text>

                <Stack justifyContent={"space-between"} alignItems="row" direction={"row"}>
                    <Text fontSize=".75rem" fontWeight="500">
                        Speech-to-Text Engine

                    </Text>
                    {/* SSt Engine Select */}
                    <Select
                        value='Default'
                        name='ttsEngine'
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    width: "fit-content",
                                    fontSize: ".75rem",
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    backgroundColor: "grey.400",
                                    boxShadow: "none",
                                    // height: "fit-content",
                                    padding: "0",
                                    "& .MuiList-root": {
                                        padding: ".2rem",
                                    },
                                },
                            },
                            autoFocus: false,
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                        }}
                        size="small"
                        variant="outlined"
                        IconComponent={KeyboardArrowDown}
                        renderValue={(value) => value}
                        sx={{
                            "& .MuiSelect-select": {
                                padding: "0 .5rem",
                                width: "fit-content",
                                textTransform: "capitalize",
                                fontSize: ".75rem",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: ".5rem",
                                whiteSpace: "nowrap",
                            },
                            "& fieldSet": {
                                border: "none !important",
                            },
                        }}
                    >
                        {['Default', 'Web API']?.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: ".75rem",
                                    whiteSpace: "nowrap",
                                    padding: ".3rem 1rem",
                                    "&:hover": {
                                        borderRadius: ".5rem",
                                        color: "common.white",
                                        backgroundColor: "primary.light",
                                    },
                                    "&.Mui-selected": {
                                        borderRadius: ".5rem",
                                        backgroundColor: "transparent",
                                        "&:hover": {
                                            color: "common.white",
                                            backgroundColor: "primary.light",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        visibility: 'Default' === option ? "visible" : "hidden",
                                        minWidth: "fit-content !important",
                                        width: "1rem",
                                        color: "inherit",
                                        mr: 0.3,
                                    }}
                                >
                                    <Check fontSize="small" />
                                </ListItemIcon>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>

                <Stack justifyContent={"space-between"} alignItems="center" direction={"row"}>
                    <Text fontSize=".75rem" fontWeight="500">
                        Instant Auto-Send After Voice Transcription

                    </Text>
                    <UniversalButton
                        label={'On'}
                        backgroundColor='transparent'
                        textColor='grey.900'
                        border='none'
                        width='fit-content'
                        variant='outlined'
                        size='small'
                        sx={{
                            fontWeight: '400',
                            fontSize: '.75rem',
                            padding: '0',
                        }}
                    />
                </Stack>

{/* TTS Setting */}
                <Text
                    fontSize=".87rem"
                    fontWeight="500"
                    sx={{
                        mt:'.5rem',
                        lineHeight: "1.25",
                    }}
                >
                    TTS Settings
                </Text>

                <Stack justifyContent={"space-between"} alignItems="center" direction={"row"}>
                    <Text fontSize=".75rem" fontWeight="500">
                        Auto-playback response
                    </Text>
                    <UniversalButton
                        label={'On'}
                        backgroundColor='transparent'
                        textColor='grey.900'
                        border='none'
                        width='fit-content'
                        variant='outlined'
                        size='small'
                        sx={{
                            fontWeight: '400',
                            fontSize: '.75rem',
                            padding: '0',
                        }}
                    />
                </Stack>

                <Divider sx={{ my: 2 }} />

{/* Set voice Select */}

                <Text
                    fontSize=".87rem"
                    fontWeight="500"
                    sx={{
                        lineHeight: "1.25",
                    }}
                >
                    Set Voice
                </Text>

                <Select
                    id='default-model-select'
                    value='Default'
                    size='small'
                    variant='outlined'
                    IconComponent={KeyboardArrowDown}
                    renderValue={(value) => value || 'Select a model'}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                fontSize: '.875rem',
                                border: `1px solid ${theme.palette.grey[500]}`,
                                backgroundColor: 'grey.400',
                                boxShadow: 'none',
                                height: 'fit-content',
                                padding: '0',
                                '& .MuiList-root': {
                                    padding: '.2rem',
                                },
                            },
                        },
                        autoFocus: false,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                    }}
                    sx={{
                        '& .MuiSelect-select': {
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '.875rem',
                            backgroundColor: 'common.white',
                            border: 'none',
                            borderRadius: '.5rem',
                            whiteSpace: 'nowrap',
                        },
                        '& fieldSet': {
                            border: 'none !important',
                        },
                    }}
                >
                    <MenuItem value='' disabled>
                        <ListItemIcon sx={{ visibility: '' === '' ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                            <Check fontSize='small' />
                        </ListItemIcon>{' '}
                        Select a model
                    </MenuItem>
                    {['mixtral:latest'].map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon sx={{ visibility: 'default' === option ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                                <Check fontSize='small' />
                            </ListItemIcon>
                            {option}
                        </MenuItem>
                    ))}
                </Select>


{/* ALl  non Local voices */}
                <Stack justifyContent={"space-between"} alignItems="center" direction={"row"}>
                    <Text fontSize=".75rem" fontWeight="500">
                        Allow non-local voices
                    </Text>
                    <CustomSwitch value={true} />
                </Stack>
            </Stack>
            <UniversalButton
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    m: "1rem 0 0",
                    alignSelf: "flex-end",
                    fontWeight: "500",
                    backgroundColor: "success.dark",
                    border: "none",
                    borderRadius: ".5em",
                    padding: "0.75rem 1rem",
                    lineHeight: "1",
                    "&:hover": {
                        backgroundColor: "success.dark",
                    },
                }}
            />
        </Stack>
    );
};

export default AudioSetting;
