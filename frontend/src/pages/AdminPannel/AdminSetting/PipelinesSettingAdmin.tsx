import React from 'react';
import UniversalButton from '../../../components/common/UniversalButton';
import { Stack } from '@mui/material';
import Text from '../../../components/common/Text';

const PipelinesSettingAdmin = () => {
    return (
        <Stack height={"100%"} component={"form"}>
            <Stack gap={1} height={'100%'} flex={"1 1 auto"}
                sx={{
                    overflowY: 'auto'
                }}>        
                    <Text fontSize=".87rem" fontWeight="600"
                    sx={{
                        lineHeight: "1.25",
                    }}>
                        Manage Pipelines          
                    </Text>
                    <Text fontSize=".87rem" fontWeight="400">
                    Pipelines Not Detected
                    </Text>

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

export default PipelinesSettingAdmin;