import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useChengeBooking() {
  const token = useToken();

  const {
    loading: changeBookingLoading,
    error: changeBookingError,
    act: changeBooking,
  } = useAsync((roomId, bookingId) => bookingApi.changeBooking(roomId, bookingId, token), false);

  return {
    changeBookingLoading,
    changeBookingError,
    changeBooking,
  };
}
