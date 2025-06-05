export interface ProblemData {
  problem_title: string;
  problem_topics: string[];
  problem_description: string;
  problem_examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  problem_constraints: string[];
  problem_testcases: Array<{
    input: string;
    output: string;
  }>;
  boilerplate_code: string;
}