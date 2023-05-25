import api from './api';

export async function findActivitiesByDate(date, token) {
    const response = await api.get(`/activities/locations?date=${date}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}