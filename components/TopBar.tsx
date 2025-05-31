import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
    title: string;
    onLeftPress?: () => void;
    onRightPress?: () => void;
    leftIcon?: string;   // Ejemplo: "arrow-back"
    rightIcon?: string;  // Ejemplo: "settings"
}

const TopBar: React.FC<Props> = ({ title, onLeftPress, onRightPress, leftIcon, rightIcon }) => {
    const { theme } = useThemeContext();

    return (
        <Animated.View entering={FadeInDown} style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.side}>
                {leftIcon && (
                    <Pressable onPress={onLeftPress}>
                        <MaterialIcons name={leftIcon as any} size={24} color={theme.colors.text} />
                    </Pressable>
                )}
            </View>

            <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>

            <View style={styles.side}>
                {rightIcon && (
                    <Pressable onPress={onRightPress}>
                        <MaterialIcons name={rightIcon as any} size={24} color={theme.colors.text} />
                    </Pressable>
                )}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    side: {
        width: 40,
        alignItems: 'center',
    },
});

export default TopBar;
