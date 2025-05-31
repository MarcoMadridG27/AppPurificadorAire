import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    onToggleFan: () => void;
    isFanOn: boolean;
}

const ControlPanel: React.FC<Props> = ({ onToggleFan, isFanOn }) => {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
                Panel de Control
            </Text>

            <TouchableOpacity
                onPress={onToggleFan}
                activeOpacity={0.85}
                style={[
                    styles.button,
                    {
                        backgroundColor: isFanOn
                            ? theme.colors.error
                            : theme.colors.primary,
                    },
                ]}
            >
                <MaterialIcons
                    name={isFanOn ? 'power-settings-new' : 'power'}
                    size={22}
                    color="#fff"
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>
                    {isFanOn ? 'Desactivar ventilador' : 'Activar ventilador'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ControlPanel;
