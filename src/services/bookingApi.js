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

export async function changeBooking(roomId, bookingId, token) {
  const body = { roomId };
  const response = await api.put(`/booking/${bookingId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
