export function generateStaticParams() {
  return [
    { catchAll: ['about'] },
    { catchAll: ['resume'] },
    { catchAll: ['writings'] },
    { catchAll: ['home'] },
  ];
}

export default function CatchAllSidebar() {
  return null;
}
