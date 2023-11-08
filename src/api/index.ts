import { supabase } from '../supabase/client';

const playerQueryData = `
  players (
    id,
    name,
    profile_picture_url,
    twitch_url
  )
`;

export enum Scores {
  FINAL_SCORE = 'final_score',
  TRANSITION_19_SCORE = 'trans_19',
  TRANSITION_29_SCORE = 'trans_29',
}

export const getScores = async (type: Scores) => {
  const { data: games, error } = await supabase
    .from('tetris_games')
    .select(`
      id,
      ${type},
      game_link,
      ${playerQueryData}
    `)
    .not(type, 'is', null)
    .order(type, { ascending: false })
    .limit(10);
  console.log(error);
  return games;
};
