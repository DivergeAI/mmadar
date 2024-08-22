import { createContext, useMemo, useState } from "react";
import {  ThemeProvider as MUIThemeProvider} from "@mui/material";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";



type MuiThemeProviderPropsType = {
    children: React.ReactNode;
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeProvider = ({ children } : MuiThemeProviderPropsType) => {

    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = mode === 'light' ? LightTheme : DarkTheme;

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [mode]
    );        
    

    return (
        <ColorModeContext.Provider value={colorMode}>
        <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ColorModeContext.Provider>
    );
}
