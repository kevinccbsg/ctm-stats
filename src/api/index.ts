import { supabase } from '../supabase/client';

export const allTimeHighScores = async () => {
  const { data: games, error } = await supabase
    .from('tetris_games')
    .select(`
      id,
      final_score,
      game_link,
      players (
        id,
        name,
        profile_picture_url,
        twitch_url
      )
    `)
    .order('final_score', { ascending: false })
    .limit(10);
  console.log(error);
  return games;
};
