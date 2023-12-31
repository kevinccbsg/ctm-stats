import { supabase } from '../supabase/client';
import { EScores, Score, GameResult } from './api.model';

const gameResultsQuery = `
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
      name,
      year
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
`;

export const getScores = async (type: EScores): Promise<Score[]> => {
  const { data: results, error } = await supabase
    .from('tetris_games')
    .select(gameResultsQuery)
    .not(type, 'is', null)
    .order(type, { ascending: false })
    .limit(10)
    .returns<GameResult[] | null>();
  if (error) throw new Error(error.details);
  if (!results) return [];
  return results.map(result => ({
    id: result.id,
    image: result.player.profile_picture_url,
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
  image: string | null;
  value: string;
}

export const lifetimeStats = async (stat: LifeTimeStatistic, prefix = ''): Promise<Statistic[]> => {
  const { data, error } = await supabase.rpc('lifetime_stats')
    .order(stat, { ascending: false })
    .limit(10);
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.id,
    name: item.name,
    image: item.profile_picture_url,
    value: `${item[stat].toLocaleString()}${prefix}`,
  }));
};

export const yearStats = async (stat: LifeTimeStatistic, year: number, prefix = ''): Promise<Statistic[]> => {
  const { data, error } = await supabase.rpc('year_stats', { event_year_param: year })
    .order(stat, { ascending: false })
    .limit(10);
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.id,
    name: item.name,
    image: item.profile_picture_url,
    value: `${item[stat].toLocaleString()}${prefix}`,
  }));
};

export const userStats = async (playerId: number) => {
  const { data, error } = await supabase
    .from('tetris_games')
    .select(gameResultsQuery)
    .eq('player_id', playerId)
    .not('final_score', 'is', null)
    .order('final_score', { ascending: false })
    .returns<GameResult[] | null>();
  if (error) throw new Error(error.details);
  if (!data) throw new Error(`Player ${playerId} not found`);
  return {
    results: data.map(result => ({
      id: result.id,
      link: result.game_link,
      description: `Win vs ${result.opponent?.name}, Game ${result.game_number} in ${result.round} of ${result.matches?.events?.name}`,
      score: (result.final_score || 0).toLocaleString(),
    })),
    user: data[0].player,
  };
};

export const getPlayersList =async (name: string) => {
  const { data, error } = await supabase
    .from('players')
    .select(`
      id,
      name
    `)
    .ilike('name', `%${name}%`)
    .order('name', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data;
};

interface Player {
  id: number;
  name: string;
  profile_picture_url: string | null;
}

export const getPlayers = async (playerId: number, opponentId: number) => {
  const { data, error } = await supabase.from('players')
    .select(`
      id,
      name,
      profile_picture_url
    `)
    .in('id', [playerId, opponentId]);
  if (error) throw new Error(error.details);
  if (!data) throw new Error(`Player ${playerId} and ${opponentId} not found`);
  return {
    player: data.find(({ id }) => id === playerId) as Player,
    opponent: data.find(({ id }) => id === opponentId) as Player,
  };
};

export const playerVsPlayer = async (playerId: number, opponentId: number) => {
  const { data, error } = await supabase.rpc('get_player_v_player_results', {
    player1_id: playerId,
    player2_id: opponentId,
  });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data;
};

export const medianScore = async () => {
  const { data, error } = await supabase.rpc('calculate_combined_median')
    .limit(10)
    .order('combined_median', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.player_fms_id,
    name: item.player_fms_name,
    image: item.profile_picture_url,
    value: item.combined_median.toLocaleString(),
  }));
};

export const fair19Percentage = async () => {
  const { data, error } = await supabase.rpc('fair_19_percentage')
    .limit(10)
    .order('percentage', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.player_id,
    name: item.player_name,
    image: item.profile_picture_url,
    value: `${item.percentage}%`,
  }));
};

export const fair29Percentage = async () => {
  const { data, error } = await supabase.rpc('fair_29_percentage')
    .limit(10)
    .order('percentage', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.player_id,
    name: item.player_name,
    image: item.profile_picture_url,
    value: `${item.percentage}%`,
  }));
};

export const fairMedianTrans19 = async () => {
  const { data, error } = await supabase.rpc('fair_median_trans_19')
    .limit(10)
    .not('median_trans_19', 'is', null)
    .order('median_trans_19', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.player_id,
    name: item.player_name,
    image: item.profile_picture_url,
    value: item.median_trans_19.toLocaleString(),
  }));
};

export const fairMedianTrans29 = async () => {
  const { data, error } = await supabase.rpc('fair_median_trans_29')
    .limit(10)
    .not('median_trans_29', 'is', null)
    .order('median_trans_29', { ascending: false });
  if (error) throw new Error(error.details);
  if (!data) return [];
  return data.map(item => ({
    id: item.player_id,
    name: item.player_name,
    image: item.profile_picture_url,
    value: item.median_trans_29.toLocaleString(),
  }));
};
