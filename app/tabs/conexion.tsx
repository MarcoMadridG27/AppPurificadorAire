import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeContext } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STORAGE_KEY = 'purificador_ip';

export default function Conexion() {
    const { theme } = useThemeContext();
    const [ip, setIp] = useState('');
    const [estado, setEstado] = useState<'desconectado' | 'conectando' | 'conectado'>('desconectado');

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then(value => {
            if (value) setIp(value);
        });
    }, []);

    const probarConexion = async () => {
        if (!ip.trim()) {
            Alert.alert('⚠️ IP vacía', 'Por favor ingresa la IP del purificador.');
            return;
        }

        setEstado('conectando');
        try {
            const response = await fetch(`http://${ip}/status`);
            const data = await response.text();
            if (response.ok) {
                await AsyncStorage.setItem(STORAGE_KEY, ip);
                setEstado('conectado');
                Alert.alert('✅ Conectado', `Respuesta: ${data}`);
            } else {
                throw new Error('Respuesta no válida');
            }
        } catch (error) {
            setEstado('desconectado');
            Alert.alert('❌ Error de conexión', 'No se pudo conectar con el purificador.');
        }
    };

    return (
        <View style={[styles.outer, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.card, { backgroundColor: theme.colors.surface + 'EE', shadowColor: theme.colors.primary }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Conexión con el purificador</Text>

                <TextInput
                    style={[styles.input, {
                        borderColor: theme.colors.primary,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.card,
                    }]}
                    value={ip}
                    onChangeText={setIp}
                    placeholder="Ej: 192.168.0.123"
                    placeholderTextColor={theme.colors.outline}
                    keyboardType="numeric"
                />

                <Pressable
                    onPress={probarConexion}
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? theme.colors.primary + 'AA' : theme.colors.primary,
                            shadowColor: theme.colors.primary,
                        },
                    ]}
                >
                    <Text style={styles.buttonText}>Probar conexión</Text>
                </Pressable>

                <View style={styles.estadoContainer}>
                    {estado === 'conectando' ? (
                        <>
                            <ActivityIndicator size="small" color={theme.colors.primary} />
                            <Text style={[styles.estadoText, { color: theme.colors.text }]}>Conectando...</Text>
                        </>
                    ) : (
                        <>
                            <MaterialCommunityIcons
                                name={estado === 'conectado' ? 'check-circle' : 'close-circle'}
                                size={24}
                                color={estado === 'conectado' ? '#4caf50' : '#f44336'}
                            />
                            <Text style={[styles.estadoText, { color: theme.colors.text }]}>
                                {estado === 'conectado' ? 'Conectado' : 'Desconectado'}
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        borderRadius: 20,
        padding: 28,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1.2,
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 24,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    estadoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    estadoText: {
        fontSize: 16,
        marginLeft: 10,
    },
});
