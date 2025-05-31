import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
    theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {},
    theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemScheme = useColorScheme();
    const [isDark, setIsDark] = useState(systemScheme === 'dark');

    const toggleTheme = () => setIsDark(prev => !prev);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
