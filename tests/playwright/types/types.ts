export type SolveState = 'correct' | 'close' | 'wrong' | 'default'

export type PuzzleItem = {
  label: string;
  state: SolveState;
};