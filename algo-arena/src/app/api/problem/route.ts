import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { promptHints } from '@/app/constants/promptHints';

const fallbackProblems = {
  arena1: {
    problem_title: "Two Sum",
    problem_description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    difficulty: "Easy",
    tags: ["Array", "Hash Table"]
  },
  arena2: {
    problem_title: "Add Two Numbers",
    problem_description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    difficulty: "Medium",
    tags: ["Linked List", "Math", "Recursion"]
  },
  arena3: {
    problem_title: "Median of Two Sorted Arrays",
    problem_description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"]
  }
};

class APIRateLimiter {
  private static instance: APIRateLimiter;
  private lastRequestTime: number = 0;
  private requestCount: number = 0;
  private dailyRequestCount: number = 0;
  private lastResetTime: number = Date.now();

  static getInstance(): APIRateLimiter {
    if (!APIRateLimiter.instance) {
      APIRateLimiter.instance = new APIRateLimiter();
    }
    return APIRateLimiter.instance;
  }

  async canMakeRequest(): Promise<boolean> {
    const now = Date.now();
    
    if (now - this.lastResetTime > 24 * 60 * 60 * 1000) {
      this.dailyRequestCount = 0;
      this.lastResetTime = now;
    }

    if (this.dailyRequestCount >= 15) {
      console.log('Daily quota exceeded');
      return false;
    }

    if (now - this.lastRequestTime < 60000) {
      if (this.requestCount >= 15) {
        console.log('Per-minute quota would be exceeded');
        return false;
      }
    } else {
      this.requestCount = 0;
    }

    return true;
  }

  recordRequest(): void {
    const now = Date.now();
    this.lastRequestTime = now;
    this.requestCount++;
    this.dailyRequestCount++;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const arena = searchParams.get('arena') || 'arena1';
  
  console.log(`Generating easy problem for arena: ${arena}`);
  
  const rateLimiter = APIRateLimiter.getInstance();
  
  if (!(await rateLimiter.canMakeRequest())) {
    console.log('Rate limit check failed, using fallback');
    return NextResponse.json(fallbackProblems[arena as keyof typeof fallbackProblems] || fallbackProblems.arena1);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest"
    });

    const difficultyMap = {
      arena1: 'Easy',
      arena2: 'Medium', 
      arena3: 'Hard'
    };

    const difficulty = difficultyMap[arena as keyof typeof difficultyMap] || 'Easy';
    const hint = promptHints[Math.floor(Math.random() * promptHints.length)];

    const prompt = `Generate a ${difficulty} level coding problem suitable for a programming contest. ${hint} Return ONLY a valid JSON object with this exact structure:

{
  "problem_title": "Two Sum",
  "problem_topics": ["Arrays", "Two Pointers"],
  "problem_description": "<p>Given an array of integers <code>nums</code>...</p>",
  "problem_examples": [
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "Because nums[0] + nums[1] == 9..."
    }
  ],
  "problem_constraints": [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9"
  ],
  "problem_testcases": [
    { "input": "6\\n2 7 11 15 3 6\\n9", "output": "0 1" }
  ],
  "boilerplate_code": "public int[] twoSum(int[] nums, int target) {\\n    // your code here\\n}"
}

Requirements:
- The problem should be ${difficulty} difficulty
- Include 1-2 clear examples
- Make it a classic algorithm/data structure problem
- Ensure JSON is properly formatted
- No markdown formatting, just pure JSON
- Do not repeat popular problems like "Two Sum", "Add Two Numbers", or "Median of Two Sorted Arrays". Generate fresh and creative variations.
- IMPORTANT: The outputs in "problem_examples" and "problem_testcases" must match exactly. Their input-output pairs should be consistent without any contradictions.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    rateLimiter.recordRequest();
    
    console.log('Gemini response received, length:', text.length);

    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const problemData = JSON.parse(cleanText);
      
      if (!problemData.problem_title || !problemData.problem_description) {
        throw new Error('Invalid problem structure');
      }
      
      return NextResponse.json(problemData);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', text);
      throw new Error('Failed to parse AI response');
    }

  } catch (error: any) {
    console.error('Error generating problem:', error);
    
    if (error.status === 429) {
      console.log('Rate limit hit, using fallback');
    }
    
    console.log('Returning fallback problem due to error');
    return NextResponse.json(fallbackProblems[arena as keyof typeof fallbackProblems] || fallbackProblems.arena1);
  }
}