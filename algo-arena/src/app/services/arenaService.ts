import { 
    arena1Problems,
    arena2Problems,
    arena3Problems,
    Problem
} from "../problemsBucket";

const arenaProblemMap: Record<string, Problem[]> = {
  arena1: arena1Problems,
  arena2: arena2Problems,
  arena3: arena3Problems,
};

export const getRandomProblemFromArena = (arena: string): Problem | null => {
  const bucket = arenaProblemMap[arena];
  if (!bucket || bucket.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * bucket.length);
  return bucket[randomIndex];
};