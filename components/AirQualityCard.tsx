import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  airQuality: string; // "Buena", "Moderada", "Dañina", "Muy Dañina"
  level: 'Verde' | 'Amarillo' | 'Naranja' | 'Rojo';
  pmValue: number;
}

const levelData = {
  Verde: {
    icon: 'weather-sunny',
    gradient: ['#43cea2', '#185a9d'],
    description: 'Calidad del aire saludable.',
  },
  Amarillo: {
    icon: 'weather-cloudy',
    gradient: ['#fceabb', '#f8b500'],
    description: 'Moderada, evitar actividades físicas prolongadas.',
  },
  Naranja: {
    icon: 'weather-hazy',
    gradient: ['#f7971e', '#ffd200'],
    description: 'Poco saludable para grupos sensibles.',
  },
  Rojo: {
    icon: 'weather-lightning',
    gradient: ['#ff416c', '#ff4b2b'],
    description: 'Peligroso, permanezca en interiores.',
  },
};

const AirQualityCard: React.FC<Props> = ({ airQuality, level, pmValue }) => {
  const { icon, gradient, description } = levelData[level];

  return (
      <LinearGradient colors={gradient} style={styles.card}>
        <MaterialCommunityIcons name={icon as any} size={36} color="#fff" />
        <Text style={styles.title}>{airQuality}</Text>
        <Text style={styles.subtitle}>PM2.5: {pmValue} μg/m³</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 6,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default AirQualityCard;
