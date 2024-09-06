import {
    Divider,
    ListItemIcon,
    MenuItem,
    Select,
    Stack,
    TextField,
    useTheme,
} from "@mui/material";

import Text from "../../../components/common/Text";
import CustomSwitch from "../../../components/common/CustomSwitch";
import TextFieldContainer from "../../../components/common/TextFieldContainer";
import { Check, KeyboardArrowDown } from "@mui/icons-material";
import UniversalButton from "../../../components/common/UniversalButton";
import { useFormik } from "formik";

type GeneralSettingsAdminProps = {
    enableNewSignUps: boolean;
    userRole: string;
    adminDetailInAccountPendingOverlay: boolean;
    enableCommunitySharing: boolean;
    jwtExpiration: string;
    webhookURL: string;
};
const initialValues:GeneralSettingsAdminProps  = {
        enableNewSignUps: true,
        userRole: 'pending',
        adminDetailInAccountPendingOverlay: true,
        enableCommunitySharing: true,
        jwtExpiration: "-1",
        webhookURL: "",   
}
const GeneralSettingsAdmin = () => {
    const theme = useTheme();

const { handleChange, values,handleSubmit} = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
        }
})

    return (
        <Stack height={"100%"} component={"form"} onSubmit={handleSubmit}>
            <Stack
                gap={1}
                height={"100%"}
                flex={"1 1 auto"}
                sx={{
                    overflowY: "auto",
                }}
            >
                {" "}
                <Text fontSize=".87rem" fontWeight="500">
                    General Settings
                </Text>
                {/* enable New SignUps */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text fontSize=".75rem" fontWeight="500">
                        Enable New Sign Ups
                    </Text>
                    <CustomSwitch name='enableNewSignUps' value={values.enableNewSignUps} onChange={handleChange} />
                </Stack>
                {/* user role default */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    {/* User Role */}
                    <Text fontSize=".75rem" fontWeight="500">
                    Default User Role
                    </Text>
                    <Select
                    name="userRole"
                    value={values.userRole}
                    onChange={handleChange}
                        size="small"
                        variant="outlined"
                        IconComponent={KeyboardArrowDown}
                        renderValue={(value) => value}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    width: "fit-content",
                                    fontSize: ".75rem",
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    backgroundColor: "grey.400",
                                    boxShadow: "none",
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
                        sx={{
                            "& .MuiSelect-select": {
                                padding: "0 .5rem",
                                width: "fit-content",
                                textTransform: "capitalize",
                                fontSize: ".75rem",
                                backgroundColor: "common.white",
                                border: "none",
                                borderRadius: ".5rem",
                                whiteSpace: "nowrap",
                            },
                            "& fieldSet": {
                                border: "none !important",
                            },
                        }}
                    >
                        {["pending", "admin", "user"].map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: ".75rem",
                                    whiteSpace: "nowrap",
                                    padding: ".3rem 1rem",
                                    // borderRadius: ".5rem",
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
                                        visibility: "pending" === option ? "visible" : "hidden",
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
                    </Select>{" "}
                </Stack>
                <Divider />
                {/* Show Admin Details in Account Pending Overlay */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >

                    <Text fontSize=".75rem" fontWeight="500">
                        Show Admin Details in Account Pending Overlay
                    </Text>
                    <CustomSwitch name='adminDetailInAccountPendingOverlay' value={values.adminDetailInAccountPendingOverlay} onChange={handleChange} />
                </Stack>
                {/* Community Sharing */}
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Text fontSize=".75rem" fontWeight="500">
                        Enable Community Sharing
                    </Text>
                    <CustomSwitch name='enableCommunitySharing' value={values.enableCommunitySharing} onChange={handleChange} />
                </Stack>
                <Divider />
                <TextFieldContainer label="JWT Expiration">
                    <TextField
                        name="jwtExpiration"
                        value={values.jwtExpiration}
                        onChange={handleChange}
                        placeholder={`e.g.) "30m", "1h", "1d"`}
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: ".5rem",
                                backgroundColor: "grey.200",
                                fontSize: ".75rem",
                            },
                            "& fieldset": {
                                border: "none",
                            },
                        }}
                    />
                    <Text
                        fontSize="small"
                        fontWeight="500"
                        color="grey.500"
                        sx={{
                            mt: ".4rem",
                        }}
                    >
                        Valid time units: 's', 'm', 'h', 'd', 'w' or '-1' for no expiration.
                    </Text>
                </TextFieldContainer>
                <Divider />
                <TextFieldContainer label="Webhook URL">
                    <TextField
                        name="webhookURL"
                        value={values.webhookURL}
                        onChange={handleChange}
                        placeholder={"https://example.com/webhook"}
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: ".5rem",
                                backgroundColor: "grey.200",
                                fontSize: ".75rem",
                            },
                            "& fieldset": {
                                border: "none",
                            },
                        }}
                    />
                </TextFieldContainer>
            </Stack>

            {/* Submit form button */}
            <UniversalButton
            type="submit"
                label={"Save"}
                width={"fit-content"}
                fontSize={"medium"}
                textColor="common.white"
                sx={{
                    m: "1rem 0 0 ",
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

export default GeneralSettingsAdmin;
