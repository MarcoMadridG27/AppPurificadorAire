import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useThemeContext } from '../../context/ThemeContext';
import AirSummary from "@/components/AirSummary";

type RegistroSensor = {
    timestamp: string;
    pm25: number;
};

const datosSimulados: RegistroSensor[] = [
    { timestamp: '2025-05-27T09:00:00Z', pm25: 32 },
    { timestamp: '2025-05-27T12:00:00Z', pm25: 40 },
    { timestamp: '2025-05-27T18:00:00Z', pm25: 36 },
    { timestamp: '2025-05-28T08:00:00Z', pm25: 30 },
    { timestamp: '2025-05-28T20:00:00Z', pm25: 28 },
    { timestamp: '2025-05-29T10:00:00Z', pm25: 50 },
    { timestamp: '2025-05-30T11:00:00Z', pm25: 42 },
    { timestamp: '2025-05-30T19:00:00Z', pm25: 38 },
];

export default function Historial() {
    const [labels, setLabels] = useState<string[]>([]);
    const [promedios, setPromedios] = useState<number[]>([]);
    const { theme } = useThemeContext();

    useEffect(() => {
        const agrupado: Record<string, number[]> = {};

        datosSimulados.forEach(({ timestamp, pm25 }) => {
            const date = parseISO(timestamp);
            const dia = format(date, 'EEE', { locale: es });
            if (!agrupado[dia]) agrupado[dia] = [];
            agrupado[dia].push(pm25);
        });

        const dias = Object.keys(agrupado);
        const valores = dias.map(dia => {
            const promedio =
                agrupado[dia].reduce((sum, val) => sum + val, 0) / agrupado[dia].length;
            return Math.round(promedio);
        });

        setLabels(dias);
        setPromedios(valores);
    }, []);

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Historial de calidad del aire (PM2.5)
                </Text>

                <View style={[styles.card, { backgroundColor: theme.colors.surface + 'F0' }]}>
                    <LineChart
                        data={{
                            labels,
                            datasets: [{ data: promedios }],
                        }}
                        width={Dimensions.get('window').width - 60}
                        height={240}
                        yAxisSuffix=" PM"
                        chartConfig={{
                            backgroundGradientFrom: theme.colors.surface,
                            backgroundGradientTo: theme.colors.surface,
                            decimalPlaces: 0,
                            color: (opacity = 1) => theme.colors.primary + opacity,
                            labelColor: () => theme.colors.text,
                            propsForDots: {
                                r: '5',
                                strokeWidth: '2',
                                stroke: theme.colors.primary,
                            },
                        }}
                        bezier
                        style={{ borderRadius: 16 }}
                    />
                    <AirSummary data={promedios} labels={labels} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    card: {
        padding: 16,
        borderRadius: 20,
        elevation: 3,
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
});
