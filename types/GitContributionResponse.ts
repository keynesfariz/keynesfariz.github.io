type GitContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export default interface GitContributionResponse {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: Array<GitContribution>;
  updated_at: string
}
