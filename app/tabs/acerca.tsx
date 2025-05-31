import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';

export default function Acerca() {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={[styles.title, { color: theme.colors.text }]}>Acerca de la App</Text>
            <Text style={[styles.text, { color: theme.colors.text }]}>
                Esta aplicación fue desarrollada como parte del proyecto PI3 para monitorear y controlar
                un purificador de aire conectado mediante un ESP32.
            </Text>
            <Text style={[styles.text, { color: theme.colors.text }]}>
                El objetivo es mejorar la calidad del aire en espacios interiores a través de sensores,
                ventilación inteligente y visualización de datos en tiempo real.
            </Text>
            <Text style={[styles.footer, { color: theme.colors.outline }]}>
                Desarrollado por estudiantes de PI3 - 2025.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 22,
    },
    footer: {
        fontSize: 14,
        marginTop: 30,
        fontStyle: 'italic',
    },
});
