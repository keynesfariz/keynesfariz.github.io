import { createFileRoute } from '@tanstack/react-router';
import { allJournals } from 'content-collections';

export const Route = createFileRoute('/journals_/$journalId')({
  loader: ({ params }) => {
    return allJournals.find((journal) => journal.slug === params.journalId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const journal = Route.useLoaderData();
  return <div>{JSON.stringify(journal)}</div>;
}
