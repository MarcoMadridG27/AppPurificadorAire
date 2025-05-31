// app/_layout.tsx
import { ThemeProvider, useThemeContext } from '../context/ThemeContext';
import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

function InnerLayout() {
    const { theme } = useThemeContext();
    return (
        <PaperProvider theme={theme}>
            <Slot />
        </PaperProvider>
    );
}

export default function Layout() {
    return (
        <ThemeProvider>
            <InnerLayout />
        </ThemeProvider>
    );
}
