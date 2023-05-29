import useAsync from '../useAsync';
import useToken from '../useToken';
import activitiesApi from '../../services/activitiesApi';

export default function useGetSubscriptions() {
  const token = useToken();

  const {
    data: subscriptions,
    act: updateSubscriptions
  } = useAsync(() => activitiesApi.findSubscribedActivities(token), true);

  return {
    subscriptions,
    updateSubscriptions
  };
}
