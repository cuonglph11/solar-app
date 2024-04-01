import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { siteApi } from '../const';
import { Site } from '../types';

export const getSites = (): Promise<Site[]> => {
  return axios.get(`${siteApi}/sites`);
};
type QueryFnType = typeof getSites;

type UseSitesOptions = {
  config?: QueryConfig<QueryFnType>;
};
export const useSites = ({ config }: UseSitesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['sites'],
    queryFn: () => getSites(),
  });
};
