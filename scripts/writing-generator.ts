import { addHours, setMinutes } from 'date-fns';

import { slugify } from '@/lib/string';
import { exit } from 'node:process';
import fs from 'node:fs';

const ARG_NAME = '--title=';

const title = process.argv[2]?.split(ARG_NAME)[1];

if (!title) {
  console.log(`Please provide the title of the '${ARG_NAME}'`);
  exit(1);
}

const now = new Date();
const createdAt = addHours(setMinutes(now, 42), 3);

const slug = slugify(`${title}`);

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
