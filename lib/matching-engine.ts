// // الگوریتم تطبیق هوشمند
// interface User {
//   id: string;
//   skills: Skill[];
//   learningStyle: LearningStyle;
//   interests: string[];
//   level: 'beginner' | 'intermediate' | 'advanced';
// }

// interface Skill {
//   name: string;
//   level: number; // 1-10
// }

// interface LearningStyle {
//   visual: number;      // 0-1
//   auditory: number;    // 0-1
//   reading: number;     // 0-1
//   kinesthetic: number; // 0-1
// }

// export function calculateMatchScore(userA: User, userB: User): number {
//   let score = 0;

//   // 1. مهارت‌های مکمل (40% وزن)
//   const skillComplementarity = calculateSkillComplement(userA.skills, userB.skills);
//   score += skillComplementarity * 0.4;

//   // 2. سازگاری سبک یادگیری (25% وزن)
//   const styleCompatibility = calculateStyleCompatibility(userA.learningStyle, userB.learningStyle);
//   score += styleCompatibility * 0.25;

//   // 3. علایق مشترک (20% وزن)
//   const sharedInterests = findSharedInterests(userA.interests, userB.interests);
//   score += Math.min(sharedInterests.length * 10, 20) * 0.2;

//   // 4. سطح مهارت مشابه (15% وزن)
//   const levelMatch = userA.level === userB.level ? 100 : 
//                      Math.abs(['beginner', 'intermediate', 'advanced'].indexOf(userA.level) - 
//                               ['beginner', 'intermediate', 'advanced'].indexOf(userB.level)) === 1 ? 50 : 0;
//   score += levelMatch * 0.15;

//   return Math.min(Math.round(score), 100);
// }

// function calculateSkillComplement(skillsA: Skill[], skillsB: Skill[]): number {
//   let complementScore = 0;
  
//   for (const skillA of skillsA) {
//     const skillB = skillsB.find(s => s.name === skillA.name);
//     if (skillB) {
//       // اختلاف سطح 3-7 بهترین مکمل است
//       const diff = Math.abs(skillA.level - skillB.level);
//       if (diff >= 3 && diff <= 7) {
//         complementScore += 20;
//       } else if (diff < 3) {
//         complementScore += 10;
//       }
//     }
//   }

//   return Math.min(complementScore, 100);
// }

// function calculateStyleCompatibility(styleA: LearningStyle, styleB: LearningStyle): number {
//   const diff = Math.abs(styleA.visual - styleB.visual) +
//                Math.abs(styleA.auditory - styleB.auditory) +
//                Math.abs(styleA.reading - styleB.reading) +
//                Math.abs(styleA.kinesthetic - styleB.kinesthetic);
  
//   return Math.max(0, 100 - (diff / 4) * 100);
// }

// function findSharedInterests(interestsA: string[], interestsB: string[]): string[] {
//   return interestsA.filter(interest => interestsB.includes(interest));
// }


export interface User {
  id: string;
  name: string;
  skills: Skill[];
  learningStyle: LearningStyle;
  interests: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  completedProjects: number;
}

export interface Skill {
  name: string;
  level: number; // 1-10
  type: 'has' | 'wants';
}

export interface LearningStyle {
  visual: number;
  auditory: number;
  reading: number;
  kinesthetic: number;
}

export function calculateMatchScore(userA: User, userB: User): {
  score: number;
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // 1. Skill Complementarity (40%)
  const skillScore = calculateSkillComplement(userA, userB);
  score += skillScore * 0.4;
  if (skillScore > 70) reasons.push('مهارت‌های مکمل عالی');

  // 2. Learning Style (25%)
  const styleScore = calculateStyleCompatibility(userA.learningStyle, userB.learningStyle);
  score += styleScore * 0.25;
  if (styleScore > 70) reasons.push('سبک یادگیری سازگار');

  // 3. Shared Interests (20%)
  const sharedInterests = findSharedInterests(userA.interests, userB.interests);
  score += Math.min(sharedInterests.length * 10, 20) * 0.2;
  if (sharedInterests.length > 2) reasons.push('علایق مشترک');

  // 4. Level & Experience (15%)
  const levelScore = calculateLevelCompatibility(userA.level, userB.level);
  score += levelScore * 0.15;
  if (levelScore > 70) reasons.push('سطح مهارت متناسب');

  return {
    score: Math.min(Math.round(score), 100),
    reasons: reasons.slice(0, 3),
  };
}

function calculateSkillComplement(userA: User, userB: User): number {
  let score = 0;
  let matches = 0;

  for (const skillA of userA.skills.filter(s => s.type === 'wants')) {
    const skillB = userB.skills.find(s => s.name === skillA.name && s.type === 'has');
    if (skillB) {
      matches++;
      const diff = Math.abs(skillA.level - skillB.level);
      if (diff <= 3) score += 25;
      else if (diff <= 5) score += 15;
      else score += 5;
    }
  }

  return matches > 0 ? Math.min(score / matches, 100) : 0;
}

function calculateStyleCompatibility(styleA: LearningStyle, styleB: LearningStyle): number {
  const diff = Math.abs(styleA.visual - styleB.visual) +
               Math.abs(styleA.auditory - styleB.auditory) +
               Math.abs(styleA.reading - styleB.reading) +
               Math.abs(styleA.kinesthetic - styleB.kinesthetic);
  
  return Math.max(0, 100 - (diff / 4) * 100);
}

function findSharedInterests(interestsA: string[], interestsB: string[]): string[] {
  return interestsA.filter(i => interestsB.includes(i));
}

function calculateLevelCompatibility(levelA: string, levelB: string): number {
  const levels = ['beginner', 'intermediate', 'advanced'];
  const diff = Math.abs(levels.indexOf(levelA) - levels.indexOf(levelB));
  return diff === 0 ? 100 : diff === 1 ? 60 : 20;
}

// Mock Users for Demo
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'سارا محمدی',
    skills: [
      { name: 'React', level: 8, type: 'has' },
      { name: 'TypeScript', level: 7, type: 'has' },
      { name: 'Node.js', level: 5, type: 'wants' },
    ],
    learningStyle: { visual: 0.8, auditory: 0.2, reading: 0.6, kinesthetic: 0.7 },
    interests: ['Web Development', 'UI/UX', 'Open Source'],
    level: 'intermediate',
    rating: 4.8,
    completedProjects: 12,
  },
  {
    id: '2',
    name: 'علی کریمی',
    skills: [
      { name: 'React', level: 9, type: 'has' },
      { name: 'Node.js', level: 8, type: 'has' },
      { name: 'Python', level: 6, type: 'has' },
    ],
    learningStyle: { visual: 0.6, auditory: 0.7, reading: 0.5, kinesthetic: 0.8 },
    interests: ['Web Development', 'System Design', 'Teaching'],
    level: 'advanced',
    rating: 4.9,
    completedProjects: 25,
  },
  {
    id: '3',
    name: 'مریم احمدی',
    skills: [
      { name: 'React', level: 6, type: 'has' },
      { name: 'UI/UX', level: 9, type: 'has' },
      { name: 'TypeScript', level: 4, type: 'wants' },
    ],
    learningStyle: { visual: 0.9, auditory: 0.3, reading: 0.4, kinesthetic: 0.6 },
    interests: ['UI/UX', 'Design Systems', 'Frontend'],
    level: 'intermediate',
    rating: 4.7,
    completedProjects: 15,
  },
];

