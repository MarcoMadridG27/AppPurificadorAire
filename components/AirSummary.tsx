import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
    data: number[];
    labels: string[];
}

const AirSummary: React.FC<Props> = ({ data, labels }) => {
    const { theme } = useThemeContext();
    if (data.length === 0) return null;

    const promedio = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const diaMax = labels[data.indexOf(max)];
    const diaMin = labels[data.indexOf(min)];

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Resumen Semanal</Text>

            <View style={styles.row}>
                <StatCard label="Promedio" value={`${promedio} µg/m³`} icon="chart-bar" color="#4caf50" />
                <StatCard label={`Máximo (${diaMax})`} value={`${max} µg/m³`} icon="arrow-up-bold" color="#f44336" />
                <StatCard label={`Mínimo (${diaMin})`} value={`${min} µg/m³`} icon="arrow-down-bold" color="#2196f3" />
            </View>
        </View>
    );
};

interface StatProps {
    label: string;
    value: string;
    icon: string;
    color: string;
}

const StatCard: React.FC<StatProps> = ({ label, value, icon, color }) => {
    return (
        <View style={[styles.card, { backgroundColor: `${color}22` }]}>
            <MaterialCommunityIcons name={icon as any} size={28} color={color} />
            <Text style={[styles.label, { color }]}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
    },
    card: {
        flex: 1,
        padding: 14,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    label: {
        fontSize: 13,
        marginTop: 6,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        marginTop: 4,
        fontWeight: '600',
        color: '#222',
    },
});

export default AirSummary;
