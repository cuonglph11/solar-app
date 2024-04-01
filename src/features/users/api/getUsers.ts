import { useQuery } from 'react-query';

import { authApi } from '@/features/auth';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { User } from '../types';
type GetUserResponse = {
  results: User[];
};
export const getUsers = (): Promise<GetUserResponse> => {
  return axios.get(`${authApi}/admin/users`);
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
