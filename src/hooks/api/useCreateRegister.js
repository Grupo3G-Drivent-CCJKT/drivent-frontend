import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useCreateRegister() {
  const token = useToken();

  const {
    loading: createRegisterLoading,
    error: createRegisterError,
    act: createRegister,
  } = useAsync((activityId) => activitiesApi.createRegister(activityId, token), false);

  return {
    createRegisterLoading,
    createRegisterError,
    createRegister,
  };
}
