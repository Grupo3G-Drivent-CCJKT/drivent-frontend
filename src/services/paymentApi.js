import api from './api';

export async function postPayment(creditCard, token) {
    const body = { creditCard };
    const response = await api.post('/process', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  }