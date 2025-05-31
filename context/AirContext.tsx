import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definición del tipo
interface AirContextType {
    airQuality: number;
    fanOn: boolean;
    updateAirQuality: (value: number) => void;
    toggleFan: () => void;
    fetchSensorData: () => void;
}

// Crear el contexto
const AirContext = createContext<AirContextType | undefined>(undefined);

export const useAir = () => {
    const context = useContext(AirContext);
    if (!context) {
        throw new Error('useAir debe usarse dentro de un AirProvider');
    }
    return context;
};

export const AirProvider = ({ children }: { children: ReactNode }) => {
    const [airQuality, setAirQuality] = useState(50);
    const [fanOn, setFanOn] = useState(false);
    const esp32IP = '192.168.0.123'; // Idealmente esto debería venir de AsyncStorage

    const updateAirQuality = (value: number) => {
        setAirQuality(value);
    };

    const fetchSensorData = async () => {
        try {
            const res = await fetch(`http://${esp32IP}/pm25`);
            const data = await res.json();
            if (data && data.pm25 !== undefined) {
                updateAirQuality(data.pm25);
            }
        } catch (e) {
            console.log('Error al obtener datos del sensor:', e);
        }
    };

    const toggleFan = async () => {
        try {
            const res = await fetch(`http://${esp32IP}/fan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ on: !fanOn }),
            });

            if (res.ok) {
                setFanOn(prev => !prev);
            } else {
                console.log('Error activando el ventilador');
            }
        } catch (e) {
            console.log('Error al conectar con el ESP32:', e);
        }
    };

    return (
        <AirContext.Provider
            value={{
                airQuality,
                fanOn,
                updateAirQuality,
                toggleFan,
                fetchSensorData,
            }}
        >
            {children}
        </AirContext.Provider>
    );
};
