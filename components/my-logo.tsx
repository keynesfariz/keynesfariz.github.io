import { SVGProps } from 'react';

export function MyLogo({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 255"
      width="300px"
      height="255px"
      stroke="currentColor"
      fill="currentColor"
      className={className}>
      <rect x="210" y="46" width="60" height="30" />
      <rect x="180" y="76" width="30" height="90" />
      <rect x="0" y="16" width="30" height="210" />
      <rect x="225" y="1" width="30" height="30" />
      <path d="M300,76 L300,226 L270,226 L270,196 L210,196 L210,166 L270,166 L270,76 L300,76 Z" />
      <rect x="30" y="226" width="240" height="30" />
    </svg>
  );
}
