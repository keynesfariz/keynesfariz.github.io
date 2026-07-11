import { addHours, setMinutes } from 'date-fns';

import { exit } from 'node:process';
import fs from 'node:fs';

const ARG_NAME = '--title=';

const title = process.argv[2]?.split(ARG_NAME)[1];

if (!title) {
  console.log(`Please provide the title of the '${ARG_NAME}'`);
  exit(1);
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word [a-z0-9_], non-space, non-hyphen characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

const now = new Date();
const createdAt = addHours(setMinutes(now, 42), 3);

const slug = generateSlug(`${title}`);

const template = `---
title: '${title}'
created_at: '${createdAt.toISOString()}'
description: ''
url: ''
tags: []
---
It's about ${title}
`;

fs.writeFileSync(`app/contents/${slug}.md`, template);
