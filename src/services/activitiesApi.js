import api from './api';

async function findActivitiesByDate(date, token) {
  const response = await api.get(`/activities/locations?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function getActivitiesDates(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export default { findActivitiesByDate, getActivitiesDates };
