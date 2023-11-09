import { supabase } from '../supabase/client';

const playerQueryData = `
  players (
    id,
    name,
    profile_picture_url,
    twitch_url
  )
`;

export enum EScores {
  FINAL_SCORE = 'final_score',
  TRANSITION_19_SCORE = 'trans_19',
  TRANSITION_29_SCORE = 'trans_29',
}

interface Score {
  id: number;
  name: string;
  description: string;
  value: string;
  link: string | null;
}

export const getScores = async (type: EScores): Promise<Score[]> => {
  const { data: scores, error } = await supabase
    .from('tetris_games')
    .select(`
      id,
      final_score,
      trans_19,
      trans_29,
      game_link,
      round,
      ${playerQueryData}
    `)
    .not(type, 'is', null)
    .order(type, { ascending: false })
    .limit(10);
  console.log(error);
  if (!scores) return [];
  return scores.map(score => ({
    id: score.id,
    name: score.players?.name as string,
    link: score.game_link,
    description: score.round,
    value: `${(score[type] as number).toLocaleString()}`,
  }));
};

export enum LifeTimeStatistic {
  WINNING_PERCENTAGE = 'winning_percentage',
  TOTAL_GAMES = 'total_games',
  MAXOUT_GAMES = 'maxout_games',
}

interface Statistic {
  id: number;
  name: string;
  value: string;
}

export const lifetimeStats = async (stat: LifeTimeStatistic, prefix = ''): Promise<Statistic[]> => {
  const { data, error } = await supabase.rpc('lifetime_stats')
    .order(stat, { ascending: false })
    .limit(10);
  console.log(error);
  if (!data) return [];
  return data.map(item => ({
    id: item.id,
    name: item.name,
    value: `${item[stat].toLocaleString()}${prefix}`,
  }));
};
