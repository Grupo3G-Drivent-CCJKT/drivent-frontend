import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useGetSubscriptions() {
  const token = useToken();

  const {
    data: subscriptions,
  } = useAsync(() => activitiesApi.findSubscribedActivities(token), true);

  return {
    subscriptions,
  };
}
