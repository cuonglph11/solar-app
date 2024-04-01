import { ContentLayout } from '@/components/Layout';

import { CreateTicket } from '../components/CreateTicket';
import { TicketsList } from '../components/TicketsList';

export const Tickets = () => {
  return (
    <ContentLayout title="Tickets">
      <CreateTicket />
      <TicketsList />
    </ContentLayout>
  );
};
