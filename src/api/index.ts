import { supabase } from '../supabase/client';

export const allTimeHighScores = async () => {
  const { data: session } = await supabase
    .from('tetris_games')
    .select()
    .order('final_score')
    .limit(10);

};
