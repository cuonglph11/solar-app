import * as z from 'zod';

import { Form, SelectField, InputField, TextAreaField } from '@/components/Form';
import { useUsers } from '@/features/users';

import { useCreateTicket, CreateTicketDTO } from '../api/createTicket';
import { useSites } from '../api/getSites';

const schema = z.object({
  site: z.string().nonempty('Please select a site'),
  assignee: z.string().nonempty('Please select an assignee'),
  status: z.string().nonempty('Please select a status'),
  workingDate: z.string(),
  numberOfPV: z
    .number()
    .int('Please enter an integer value')
    .positive('Please enter a positive value')
    .default(0),
  note: z.string(),
});

export const CreateTicketForm = () => {
  const createTicketMutation = useCreateTicket();
  const { data: sites, isLoading: isSitesLoading } = useSites();
  const { data: users, isLoading: isUserLoading } = useUsers();

  const _getSitesOptions = () => {
    if (isSitesLoading) {
      return [];
    }
    const sitesOptions = sites?.map((site) => ({ label: site.name, value: site.id })) ?? [
      { label: 'No site found', value: '' },
    ];
    return [{ label: 'Select Site', value: '' }, ...sitesOptions];
  };
  const _getUsersOptions = () => {
    if (isUserLoading) {
      return [
        {
          label: 'Loading users list ...',
          value: '',
        },
      ];
    }
    const usersOptions = users?.results.map((user) => ({ label: user.email, value: user.id })) ?? [
      { label: 'No user found', value: '' },
    ];
    return [{ label: 'Select Assignee', value: '' }, ...usersOptions];
  };

  return (
    <Form<CreateTicketDTO['data'], typeof schema>
      id="create-ticket"
      onSubmit={async (values) => {
        await createTicketMutation.mutateAsync({ data: values });
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <SelectField
            label="Site"
            error={formState.errors['site']}
            options={_getSitesOptions()}
            registration={register('site')}
          />
          <SelectField
            label="Assignee"
            error={formState.errors['assignee']}
            options={_getUsersOptions()}
            registration={register('assignee')}
          />
          <SelectField
            label="Status"
            error={formState.errors['status']}
            defaultValue="NOT_STARTED"
            options={[
              { label: 'Not Started', value: 'NOT_STARTED' },
              { label: 'In Progress', value: 'IN_PROGRESS' },
              { label: 'Done', value: 'DONE' },
            ]}
            registration={register('status')}
          />

          <InputField
            label="Working Date"
            error={formState.errors['workingDate']}
            registration={register('workingDate')}
          />
          <InputField
            type="number"
            label="Number of PV"
            error={formState.errors['numberOfPV']}
            registration={register('numberOfPV', { valueAsNumber: true })}
          />
          <TextAreaField
            label="Note"
            error={formState.errors['note']}
            registration={register('note')}
          />
        </>
      )}
    </Form>
  );
};
