import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const tabs: {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
}[] = [
    { name: 'index', icon: 'home', label: 'Inicio' },
    { name: 'historial', icon: 'bar-chart', label: 'Historial' },
    { name: 'consejos', icon: 'lightbulb', label: 'Consejos' },
    { name: 'conexion', icon: 'wifi', label: 'Conexión' },
    { name: 'ajustes', icon: 'settings', label: 'Ajustes' },
    { name: 'acerca', icon: 'info', label: 'Acerca' },
];

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab, index) => {
                    const isFocused = state.index === index;

                    return (
                        <Pressable
                            key={tab.name}
                            onPress={() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: state.routes[index].key,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(tab.name as never);
                                }
                            }}
                            style={styles.tab}
                        >
                            <Animated.View
                                style={[
                                    styles.pill,
                                    isFocused && styles.pillActive,
                                ]}
                            />
                            <MaterialIcons
                                name={tab.icon}
                                size={24}
                                color={isFocused ? '#00bcd4' : '#bbb'}
                            />
                            <Text
                                style={[
                                    styles.label,
                                    isFocused && styles.labelActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        height: 72,
        backgroundColor: '#1E1E2F',
        borderRadius: 40,
        paddingHorizontal: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        zIndex: 10,
    },
    scrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        marginHorizontal: 4,
        position: 'relative',
    },
    pill: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#00bcd4',
        opacity: 0,
        zIndex: -1,
    },
    pillActive: {
        opacity: 0.2,
    },
    label: {
        fontSize: 10,
        color: '#999',
        marginTop: 2,
    },
    labelActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
