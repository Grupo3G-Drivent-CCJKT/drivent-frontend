import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useCreateTicket() {
  const token = useToken();

  const {
    loading: createTicketLoading,
    error: createTicketError,
    act: createTicket
  } = useAsync((ticketTypeId) => ticketApi.createTicket(ticketTypeId, token), false);

  return {
    createTicketLoading,
    createTicketError,
    createTicket
  };
}
