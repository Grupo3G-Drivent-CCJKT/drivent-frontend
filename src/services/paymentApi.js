import api from './api';

export async function postPayment(creditCard, ticketId, token) {
  const body = { ticketId, cardData: creditCard };
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    
  return response.data;
}
