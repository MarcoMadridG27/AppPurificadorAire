const API_URL = "http://192.168.1.50"; // IP del ESP32

export const getAirQuality = async () => {
    const res = await fetch(`${API_URL}/sensor`);
    return res.json();
};

export const turnOnFan = async () => {
    await fetch(`${API_URL}/fan/on`);
};

export const turnOffFan = async () => {
    await fetch(`${API_URL}/fan/off`);
};
