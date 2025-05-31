// theme.ts
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#3F51B5',
        background: '#ffffff',
        surface: '#f2f2f2',
        text: '#000000',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#5F8DFF', // azul/cian moderno
        background: '#121326',
        surface: '#1E1E2F',
        text: '#FFFFFF',
        card: '#2B2D42',
    },
};

