import React from 'react';
import UniversalButton from '../common/UniversalButton';
import Text from '../common/Text';
import { Stack, useTheme } from '@mui/material';
import CustomSwitch from '../common/CustomSwitch';
const PersonalizationSetting = () => {
    const theme = useTheme()
    return (
        <Stack height='100%'>
            <Stack
                height={'100%'}
                flex={'1 1 auto'}
                sx={{
                    overflowY: 'auto',
                }}
            >
                <Stack justifyContent={'space-between'} alignItems='row' direction={'row'}>
                    <Text
                        fontSize='.87rem'
                        fontWeight='500'
                        sx={{
                            lineHeight: '1.25',
                        }}
                    >
                        Memory <span style={{
                            fontFamily: 'inherit',
                            fontSize: '0.75rem',
                            color: theme.palette.grey[500],
                        }}>
                            (Experimental)
                        </span>


                    </Text>
                    <CustomSwitch value={false} />
                </Stack>
                <Text fontSize='.75rem' fontWeight='400' sx={{ color: theme.palette.grey[900] }}>
                    You can personalize your interactions with LLMs by adding memories through the 'Manage' button below, making them more helpful and tailored to you.

                </Text>

                <UniversalButton 
                label = 'Manage'
                backgroundColor='transparent'
                border= {`1px solid ${theme.palette.grey[500]} !important`}
                size='small'
                width={'fit-content'}
                textColor='grey.900'
                sx={{
                    mt: '1rem',
                    borderRadius: '5rem',
                    padding: '0.3rem 1rem',
                    '&:hover': {
                        border: `1px solid ${theme.palette.grey[500]} !important`,
                        backgroundColor: 'grey.900 !important',
                    }
                }}
                />


            </Stack>
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

export default PersonalizationSetting;