import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function Ajustes() {
    const [autoMode, setAutoMode] = useState(true);
    const { isDark, toggleTheme, theme } = useThemeContext();

    useEffect(() => {
        AsyncStorage.getItem('autoMode').then(value => {
            if (value !== null) setAutoMode(JSON.parse(value));
        });
    }, []);

    const handleAutoModeChange = async (value: boolean) => {
        setAutoMode(value);
        await AsyncStorage.setItem('autoMode', JSON.stringify(value));
    };

    const mostrarAcerca = () => {
        Alert.alert(
            '¿Qué es el modo automático?',
            'El modo automático ajusta la velocidad del ventilador según la calidad del aire medida.'
        );
    };

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Configuración</Text>

                <View style={styles.row}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Modo automático</Text>
                    <Switch value={autoMode} onValueChange={handleAutoModeChange} />
                </View>

                <View style={styles.row}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Modo oscuro</Text>
                    <Switch value={isDark} onValueChange={toggleTheme} />
                </View>

                <TouchableOpacity style={styles.infoRow} onPress={mostrarAcerca}>
                    <MaterialIcons name="info-outline" size={20} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.primary }]}>
                        ¿Qué es el modo automático?
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.subtitle, { color: theme.colors.text }]}>Avanzado (en desarrollo)</Text>

                <View style={[styles.card, { backgroundColor: theme.colors.surface + '55' }]}>
                    <Text style={[styles.cardText, { color: theme.colors.outline }]}>Sincronizar con servidor</Text>
                </View>

                <View style={[styles.card, { backgroundColor: theme.colors.surface + '55' }]}>
                    <Text style={[styles.cardText, { color: theme.colors.outline }]}>Configurar umbral de calidad</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    infoText: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    card: {
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },
    cardText: {
        fontSize: 15,
        fontWeight: '500',
    },
});
