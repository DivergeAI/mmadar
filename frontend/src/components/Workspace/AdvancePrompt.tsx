import { Box, Stack, TextField } from '@mui/material';
import React, { Fragment } from 'react';
import Text from '../common/Text';
import UniversalButton from '../common/UniversalButton';
import TransparentSlider from './TransparentSlider';
import CustomSwitch from '../common/CustomSwitch';

type AdvancePromptProps = {
    label: string,
    keyName: string | number,
    value: any,
    isCustom: boolean,
    children: React.ReactNode,
    onChange: (key: string | number, value: any, isCustom?: boolean) => void,
}


export const renderPromptChildren = (type: 'slider' | 'text' | 'switch', value: any, keyName: string, handleChange: any, props: any) => {
    const { extraProps } = props;
    switch (type) {
        case 'text':
            return (
                <TextField
                    value={value}
                    onChange={(e) => handleChange(keyName, e.target.value)}
                    type={props.textProps.type}
                    variant="outlined"
                    placeholder={props.textProps.placeholder}
                    size="small"
                    fullWidth
                    sx={{

                        '& .MuiInputBase-root': {
                            borderRadius: '0.5rem',
                            backgroundColor: 'common.white',
                            padding: '0 !important',
                            fontSize: '.75rem',
                        },
                        "& fieldset": {
                            border: "none !important",

                        },
                    }}
                    {...extraProps}
                />


            );
        case 'slider':
            return (
                <TransparentSlider
                    value={value}
                    onChange={(e: Event, newValue: number | number[]) => handleChange(keyName, newValue)}
                    {...extraProps}
                />
            );
        case 'switch':
            return (
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize=".75rem" fontWeight="500" color="grey.700">{value ? "Enabled" : "Disabled"}</Text>
                    <CustomSwitch
                        value={value}
                        onChange={(e) => handleChange(keyName, e.target.checked)}
                        {...extraProps}
                    />
                </Stack>
            );
        default:
            return null;
    }
};

const AdvancePrompt = ({ label, keyName, value, isCustom, children, onChange }: AdvancePromptProps) => {

    const handleButtonClick = () => {
        onChange(keyName, value, !isCustom);
    };



    return (
        <Fragment>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Text fontSize=".75rem" fontWeight="500" sx={{ lineHeight: "1rem" }}>
                    {label}
                </Text>
                <UniversalButton
                    label={isCustom ? "Custom" : "Default"}
                    onClick={handleButtonClick}
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
                    disableRipple
                />
            </Stack>

            {isCustom && <Box>{children}</Box>}
        </Fragment>
    );
};

export default AdvancePrompt;
