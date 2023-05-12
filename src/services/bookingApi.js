import api from './api';

export async function createBooking(roomId, token) {
  const body = { roomId };
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
