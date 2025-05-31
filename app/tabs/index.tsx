import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    Pressable,
} from 'react-native';
import AirQualityCard from '../../components/AirQualityCard';
import ControlPanel from '../../components/ControlPanel';
import { AirProvider, useAir } from '../../context/AirContext';
import { useThemeContext } from '../../context/ThemeContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import FanSpeedControl from '../../components/FanSpeedControl';

function HomeContent() {
    const { airQuality, fanOn, toggleFan } = useAir();
    const { theme } = useThemeContext();
    const [speed, setSpeed] = useState(50); // por ejemplo

    const handleInfoPress = () => {
        Alert.alert(
            "¿Qué es PM2.5?",
            "Son partículas finas de menos de 2.5 micras que pueden penetrar en los pulmones y afectar la salud respiratoria."
        );
    };

    const getLevel = () => {
        if (airQuality <= 50) return 'Verde';
        if (airQuality <= 100) return 'Amarillo';
        if (airQuality <= 150) return 'Naranja';
        return 'Rojo';
    };

    const getLabel = () => {
        if (airQuality <= 50) return 'Buena';
        if (airQuality <= 100) return 'Moderada';
        if (airQuality <= 150) return 'Dañina';
        return 'Muy Dañina';
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Animated.View entering={FadeInDown.duration(600)}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </Animated.View>

            <Animated.Text entering={FadeInUp.delay(100)} style={[styles.title, { color: theme.colors.text }]}>
                Purificador de Aire
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(200)} style={styles.pmRow}>
                <Text style={[styles.pm, { color: theme.colors.text }]}>
                    PM2.5 actual: {airQuality} μg/m³
                </Text>
                <Pressable onPress={handleInfoPress} style={styles.infoButton}>
                    <Text style={styles.infoText}>i</Text>
                </Pressable>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300)}>
                <AirQualityCard airQuality={getLabel()} level={getLevel()} />
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400)}>
                <ControlPanel onToggleFan={toggleFan} isFanOn={fanOn} />
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(400)}>
                <FanSpeedControl speed={speed} setSpeed={setSpeed} />
            </Animated.View>
        </View>
    );
}

export default function Home() {
    return (
        <AirProvider>
            <HomeContent />
        </AirProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    logo: {
        width: 72,
        height: 72,
        marginTop: 30,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    pmRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    pm: {
        fontSize: 16,
        marginRight: 10,
    },
    infoButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
