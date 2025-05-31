// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import CustomTabBar from "@/components/CustomTabBar";

export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false, }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="historial"
                options={{
                    title: 'Historial',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="bar-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="consejos"
                options={{
                    title: 'Consejos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="lightbulb" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="conexion"
                options={{
                    title: 'Conexión',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="wifi" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ajustes"
                options={{
                    title: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="acerca"
                options={{
                    title: 'Acerca',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="info" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
