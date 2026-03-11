export type GitContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitResponse = {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: Array<GitContribution>;
};

export type GitNestedResponse = {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: {
    [year: number]: {
      [month: number]: {
        [day: number]: GitContribution;
      };
    };
  };
};

export type GitErrorResponse = {
  error: string;
  issues?: Array<{
    code: string;
    path: string;
    message: string;
  }>;
};
