'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Writing } from '@/.content-collections/generated';
import { getWritings } from '@/lib/content.server';
import { Badge } from '@/components/ui/badge';
import { WritingCard } from './writing-card';

function useWritingsFilter(allWritings: Writing[], urlTag: string | null) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter logic
  const filteredWritings = useMemo(() => {
    let result = allWritings;

    if (urlTag) {
      result = result.filter((wr) => wr.tags && wr.tags.includes(urlTag));
    }

    if (debouncedQuery) {
      const fuse = new Fuse(result, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
      });
      result = fuse.search(debouncedQuery).map((res) => res.item);
    }

    return result;
  }, [allWritings, urlTag, debouncedQuery]);

  return { searchQuery, setSearchQuery, filteredWritings };
}

function usePopularTags(allWritings: Writing[]) {
  return useMemo(() => {
    const tagCounts: Record<string, number> = {};
    allWritings.forEach((writing) => {
      if (writing.tags) {
        writing.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);
  }, [allWritings]);
}

export function WritingList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlTag = searchParams.get('tag');

  const [showAllTags, setShowAllTags] = useState(false);

  const allWritings = useMemo(() => getWritings() as Writing[], []);
  const popularTags = usePopularTags(allWritings);
  const displayedTags = showAllTags ? popularTags : popularTags.slice(0, 5);

  const { searchQuery, setSearchQuery, filteredWritings } = useWritingsFilter(
    allWritings,
    urlTag,
  );

  const toggleTag = (tag: string) => {
    const newTag = urlTag === tag ? null : tag;

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (newTag) {
      params.set('tag', newTag);
    } else {
      params.delete('tag');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Tags */}
      <div className="flex flex-col gap-4">
        <InputGroup className="h-11 text-base">
          <InputGroupAddon align="inline-start">
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        {popularTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {displayedTags.map((tag) => (
              <Badge
                key={tag}
                variant={urlTag === tag ? 'default' : 'secondary'}
                className="cursor-pointer text-xs font-medium"
                onClick={() => toggleTag(tag)}>
                #{tag}
              </Badge>
            ))}
            {popularTags.length > 5 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-muted-foreground hover:text-foreground ml-1 text-xs font-medium underline-offset-4 hover:underline">
                {showAllTags ? 'Show less' : 'Show all'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Masonry Grid */}
      {filteredWritings.length > 0 ? (
        <div className="columns-1 gap-6 md:columns-2">
          {filteredWritings.map((writing) => (
            <div
              key={writing._meta.path}
              className="mb-6 break-inside-avoid first:mt-0">
              <WritingCard writing={writing} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground py-12 text-center">
          No writings found for your search.
        </div>
      )}
    </div>
  );
}
