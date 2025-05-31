import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SensorGraph = () => {
    return (
        <View style={styles.graphContainer}>
            <Text style={styles.title}>Historial de calidad del aire (PM2.5)</Text>
            <LineChart
                data={{
                    labels: ['10am', '11am', '12pm', '1pm', '2pm'],
                    datasets: [
                        {
                            data: [12, 25, 18, 32, 20],
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 40}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#e3f2fd',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                    labelColor: () => '#333',
                }}
                style={{ borderRadius: 12, marginTop: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    graphContainer: {
        padding: 15,
        backgroundColor: '#f3e5f5',
        borderRadius: 12,
        marginTop: 20,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4a148c',
        textAlign: 'center',
    },
});

export default SensorGraph;
