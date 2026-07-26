import { describe, it, expect } from 'bun:test';

import type { ResumeSchema } from '@supastuff/json-resume-types';

import { getHomepageData } from './resume';

describe('getHomepageData', () => {
  it('should format homepage data correctly with full info', () => {
    const mockResume: ResumeSchema = {
      basics: {
        label: 'Lead Developer',
        location: {
          address: '123 Main St',
          city: 'Techville',
          region: 'CA',
          postalCode: '90000',
          countryCode: 'US',
        },
      },
      work: [
        {
          name: 'Tech Corp',
          position: 'Lead Developer',
          startDate: '2020-01-01',
          endDate: undefined,
          highlights: ['Built a cool thing'],
        },
        {
          name: 'Old Corp',
          position: 'Developer',
          startDate: '2018-01-01',
          endDate: '2019-12-31',
          highlights: [],
        },
      ],
    };

    const data = getHomepageData(mockResume);

    expect(data.title).toBe('Lead Developer');
    expect(data.company).toBe('Tech Corp');
    expect(data.location).toBe('123 Main St, Techville, CA, 90000, US');
    expect(data.work?.length).toBe(2);
    expect(data.work?.[0].position).toBe('Lead Developer');
    expect(data.work?.[0].name).toBe('Tech Corp');
    expect(data.work?.[0].summary).toBe('Built a cool thing');
  });

  it('should handle undefined or partial data gracefully', () => {
    const mockResume: ResumeSchema = {};
    const data = getHomepageData(mockResume);

    expect(data.title).toBe('Senior Software Engineer');
    expect(data.company).toBeUndefined();
    expect(data.location).toBe('');
    expect(data.work).toBeUndefined();
  });
});
