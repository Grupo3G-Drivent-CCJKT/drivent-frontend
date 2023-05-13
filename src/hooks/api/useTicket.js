import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    error: notFound
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    ticket,
    notFound
  };
}
