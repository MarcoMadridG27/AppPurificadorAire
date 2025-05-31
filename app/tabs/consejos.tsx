import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeContext } from '../../context/ThemeContext';

export default function Consejos() {
    const { theme, isDark } = useThemeContext();

    const tips = [
        {
            icon: 'window',
            text: 'Ventila tu hogar por las mañanas para renovar el aire.',
        },
        {
            icon: 'no-smoking',
            text: 'Evita fumar o encender velas dentro del hogar.',
        },
        {
            icon: 'air',
            text: 'Coloca el purificador en zonas cerradas para mayor eficiencia.',
        },
        {
            icon: 'cleaning-services',
            text: 'Limpia o reemplaza los filtros regularmente.',
        },
        {
            icon: 'sensors',
            text: 'Revisa periódicamente la calidad del aire para detectar cambios.',
        },
    ];

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Consejos para un aire más limpio</Text>

                {tips.map((tip, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            {
                                backgroundColor: theme.colors.surface,
                                shadowColor: isDark ? '#000' : '#aaa',
                            },
                        ]}
                    >
                        <MaterialIcons name={tip.icon as any} size={24} color={theme.colors.primary} />
                        <Text style={[styles.tipText, { color: theme.colors.text }]}>{tip.text}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        marginBottom: 15,
        borderRadius: 12,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    tipText: {
        fontSize: 16,
        flex: 1,
    },
});
