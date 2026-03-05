import { createFileRoute } from '@tanstack/react-router';
import { allJournals } from 'content-collections';

export const Route = createFileRoute('/journals')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Hello "/journals"!</h1>
      <ul>
        {allJournals.map((journal) => (
          <li key={journal.slug}>
            <a href={`/journals/${journal._meta.path}`}>
              <h3>{journal.title}</h3>
              <p>{journal.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
