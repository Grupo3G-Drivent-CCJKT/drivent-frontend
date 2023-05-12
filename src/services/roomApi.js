import api from './api';

export async function getRoomsInformations(hotelId, token) {
  const response = await api.get(`/rooms/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
