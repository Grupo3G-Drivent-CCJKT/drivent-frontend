import api from './api';

export async function getActivitiesDates(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function createRegister(activityId, token) {
  const body = { activityId };
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function findSubscribedActivities(token) {
  const response = await api.get('/activities/subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
