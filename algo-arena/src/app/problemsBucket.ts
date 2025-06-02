export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
};

export const arena1Problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
  },
];

export const arena2Problems: Problem[] = [
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "DP",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Intervals",
  },
];

export const arena3Problems: Problem[] = [
  {
    id: "median-of-two-sorted-arrays",
    title: "Median of two Sorted Arrays",
    difficulty: "Hard",
    category: "Arrays",
  },
];
