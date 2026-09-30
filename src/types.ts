export type DayCode = 'A' | 'B' | 'POOL' | 'REST';
export interface Exercise {
  id: string;
  name: string;
  day: 'A' | 'B';
  sets: string;
  rest: string;
  note?: string;
  youtube?: string;
}
export interface PoolExercise {
  id: string;
  name: string;
  duration: string;
  note: string;
  youtube?: string;
}
export interface PostureExercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  youtube?: string;
}
export interface DayPlan {
  key: string;
  label: string;
  short: string;
  code: DayCode;
  title: string;
  subtitle: string;
  exercises: (Exercise | PoolExercise)[];
  posture: PostureExercise[];
}
