export enum EScores {
  FINAL_SCORE = 'final_score',
  TRANSITION_19_SCORE = 'trans_19',
  TRANSITION_29_SCORE = 'trans_29',
}

export interface Score {
  id: number;
  name: string;
  description: string;
  value: string;
  link: string | null;
}

export interface GameResult {
  id: number;
  final_score: number | null;
  trans_19: number | null;
  trans_29: number | null;
  game_link: string | null;
  game_number: number;
  game_result: boolean;
  round: string;
  matches: {
    id: number;
    events: {
        name: string;
        year: number;
    } | null;
  } | null;
  player: {
    id: number;
    name: string;
    profile_picture_url: string | null;
  };
  opponent: {
    id: number;
    name: string;
  };
}
