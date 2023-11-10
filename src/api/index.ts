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
  const { data: results, error } = await supabase
    .from('tetris_games')
    .select(`
      id,
      final_score,
      trans_19,
      trans_29,
      game_link,
      game_number,
      game_result,
      round,
      matches (
        id,
        events (
          name
        )
      ),
      ${playerQueryData}
    `)
    .not(type, 'is', null)
    .order(type, { ascending: false })
    .limit(10);
  console.log(error);
  if (!results) return [];
  return results.map(result => ({
    id: result.id,
    name: result.players?.name as string,
    link: result.game_link,
    description: `Game ${result.game_number} in ${result.round} of ${result.matches?.events?.name}`,
    value: `${(result[type] as number).toLocaleString()}`,
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
