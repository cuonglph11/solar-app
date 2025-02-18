import { Spinner, Table } from '@/components/Elements';

import { useTickets } from '../api/getTickets';
import { Ticket } from '../types';

type TableListTicketsDto = Pick<
  Omit<Ticket, 'assignee'> & { assignee: string },
  'id' | 'ticketId' | 'assignee' | 'status' | 'workingDate'
>;

export const TicketsList = () => {
  const { isLoading, data } = useTickets({
    config: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: 'always',
      refetchOnReconnect: 'always',
    },
  });
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <Table<TableListTicketsDto>
      columns={[
        {
          field: 'ticketId',
          title: 'ID',
        },
        {
          field: 'assignee',
          title: 'Assignee',
        },
        {
          field: 'status',
          title: 'Status',
        },
        {
          field: 'workingDate',
          title: 'Working Date',
        },
      ]}
      data={data.map((item) => ({
        ...item,
        assignee: `${item.assignee.firstname} ${item.assignee.lastname}`,
      }))}
    />
  );
};
