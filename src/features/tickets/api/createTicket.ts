import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { siteApi } from '../const';
import { Ticket } from '../types';

export type CreateTicketDTO = {
  data: Pick<
    Omit<Ticket, 'assignee' | 'site'> & { assignee: string; site: string },
    'assignee' | 'status' | 'workingDate' | 'site' | 'numberOfPV' | 'note'
  >;
};

export const createTicket = ({ data }: CreateTicketDTO) => {
  return axios.post(`${siteApi}/tickets`, data);
};
type UseCreateTicketOptions = {
  config?: MutationConfig<typeof createTicket>;
};
export const useCreateTicket = ({ config }: UseCreateTicketOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Ticket Created',
      });
      //   refetchUser();
    },
    ...config,
    mutationFn: createTicket,
  });
};
