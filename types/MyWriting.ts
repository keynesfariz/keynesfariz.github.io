import { Writing } from '@/.content-collections/generated';

export default interface MyWriting extends Omit<Writing, '_meta'> {
  slug: string;
}

export type MyWritingItem = Pick<
  MyWriting,
  'slug' | 'title' | 'created_at' | 'tags' | 'description'
>;
