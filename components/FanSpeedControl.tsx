import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useThemeContext } from '../context/ThemeContext';

interface Props {
    speed: number;
    setSpeed: (value: number) => void;
}

const FanSpeedControl: React.FC<Props> = ({ speed, setSpeed }) => {
    const { theme } = useThemeContext();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
                Velocidad del Ventilador: {Math.round(speed)}%
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={speed}
                onValueChange={setSpeed}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.outline}
                thumbTintColor={theme.colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 20,
        alignItems: 'stretch',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    slider: {
        height: 40,
    },
});

export default FanSpeedControl;
