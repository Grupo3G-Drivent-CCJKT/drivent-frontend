import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';
import useTicket from './useTicket';

export default function useSavePayment() {
  const token = useToken();
  const { ticket } = useTicket();

  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: submitPayment
  } = useAsync((creditCard) => paymentApi.postPayment(creditCard, ticket.id, token), false);

  return {
    submitPayment,
    payment,
    paymentLoading,
    paymentError
  };
}
