import { Button } from '@/components/Elements';
import { FormDrawer } from '@/components/Form';

import { useCreateTicket } from '../api/createTicket';

type CreateTicketDrawerProps = {
  children: React.ReactNode;
};
export const CreateTicketDrawer = ({ children }: CreateTicketDrawerProps) => {
  const createTicketMutation = useCreateTicket();
  return (
    <FormDrawer
      triggerButton={<Button>Create</Button>}
      isDone={createTicketMutation.isSuccess}
      title="Create Ticket"
      size="lg"
      submitButton={
        <Button form="create-ticket" type="submit">
          Create
        </Button>
      }
    >
      {children}
    </FormDrawer>
  );
};
