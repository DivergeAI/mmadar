import { Divider, ListItemIcon, MenuItem, Select, Stack, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';
import Text from '../common/Text';
import { Check, KeyboardArrowDown } from '@mui/icons-material';
import UniversalButton from '../common/UniversalButton';

interface DataItem {
    label: string;
    type: 'button' | 'upload';
    value: string;
    onCLick?: () => void;
}

interface SectionData {
    [key: string]: DataItem[];
}

const InterfaceSettingChildren = ({ el }: { el: DataItem }) => {
    switch (el.type) {
        case 'button':
            return (
                <UniversalButton
                onClick={el.onCLick}
                    label={el?.value}
                    backgroundColor='transparent'
                    textColor='grey.700'
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
            );
        case 'upload':
            return (
                <UniversalButton
                onClick={el.onCLick}
                    label={el.value}
                    backgroundColor='transparent'
                    textColor='grey.700'
                    border='none'
                    width='fit-content'
                    variant='outlined'
                    size='small'
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        fontWeight: '400',
                        fontSize: '.75rem',
                        padding: '0',
                    }}
                />
            );
        default:
            return null;
    }
};

const InterfaceSetting = () => {
    const theme = useTheme();
    const fileRef = useRef(null);
    const [defaultModel, setDefaultModel] = useState('');
    const [uploadBgImage, setUploadBgImage] = useState<File | null>(null);

    const handleUploadImage = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    console.log(uploadBgImage);

    const Data: SectionData = {
        UI: [
            { label: 'Chat Bubble UI', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Display the username instead of You in the Chat', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Widescreen Mode', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Chat direction', type: 'button', value: 'LTR', onCLick: () => {} },
            { label: 'Fluidly stream large external response chunks', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Scroll to bottom when switching between branches', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Chat Background Image', type: 'upload', value: 'Upload', onCLick: handleUploadImage },
        ],
        Chat: [
            { label: 'Title Auto-Generation', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Response AutoCopy to Clipboard', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Allow User Location', type: 'button', value: 'On', onCLick: () => {} },
        ],
        Voice: [
            { label: 'Allow Voice Interruption in Call', type: 'button', value: 'On', onCLick: () => {} },
            { label: 'Display Emoji in Call', type: 'button', value: 'On', onCLick: () => {} },
        ],
    };

    return (
        <Stack height='100%'>
            <Stack
                gap={1}
                height={'100%'}
                flex={'1 1 auto'}
                sx={{
                    overflowY: 'auto',
                }}
            >
                <Text
                    fontSize='.87rem'
                    fontWeight='500'
                    sx={{
                        lineHeight: '1.25',
                    }}
                >
                    Default Model
                </Text>

                <Select
                    id='default-model-select'
                    name='defaultModel'
                    value={defaultModel}
                    onChange={(e) => setDefaultModel(e.target.value)}
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
                        <ListItemIcon sx={{ visibility: defaultModel === '' ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                            <Check fontSize='small' />
                        </ListItemIcon>{' '}
                        Select a model
                    </MenuItem>
                    {['mixtral:latest'].map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon sx={{ visibility: defaultModel === option ? 'visible' : 'hidden', minWidth: 'auto !important', width: '1rem', color: 'inherit' }}>
                                <Check fontSize='small' />
                            </ListItemIcon>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

                <Divider />

                {Object.entries(Data).map(([key, value]) => (
                    <Stack gap={0.5} key={key}>
                        <Text
                            fontSize='.875rem'
                            fontWeight='400'
                            sx={{
                                lineHeight: '1.25',
                                mb: '.7rem',
                            }}
                        >
                            {key}
                        </Text>
                        {value.map((item) => (
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} key={item.label}>
                                <Text fontSize='.75rem' fontWeight='500'>
                                    {item.label}
                                </Text>
                                <InterfaceSettingChildren el={item} />
                            </Stack>
                        ))}
                    </Stack>
                ))}

                <input type='file' ref={fileRef} onChange={(e) => setUploadBgImage(e.target.files ? e.target.files[0] : null)} style={{ display: 'none' }} />
            </Stack>
               {/* Form Submit button */}
        <UniversalButton
        label={"Save"}
        width={"fit-content"}
        fontSize={"medium"}
        textColor="common.white"
        sx={{
          m: '1rem 0 0',
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

export default InterfaceSetting;
