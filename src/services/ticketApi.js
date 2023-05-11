import api from './externalApi';

export async function getTicketTipes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
