import { supabase } from '../supabase/client';

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

interface Result {
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
      player:player_id (
        id,
        name,
        profile_picture_url
      ),
      opponent:opponent_id (
        id,
        name
      )
    `)
    .not(type, 'is', null)
    .order(type, { ascending: false })
    .limit(10)
    .returns<Result[] | null>();
  console.log(error);
  if (!results) return [];
  console.log(results[0]);
  return results.map(result => ({
    id: result.id,
    name: result.player?.name,
    link: result.game_link,
    description: `Win vs ${result.opponent?.name}, Game ${result.game_number} in ${result.round} of ${result.matches?.events?.name}`,
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

export const yearStats = async (stat: LifeTimeStatistic, year: number, prefix = ''): Promise<Statistic[]> => {
  const { data, error } = await supabase.rpc('year_stats', { event_year_param: year })
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
