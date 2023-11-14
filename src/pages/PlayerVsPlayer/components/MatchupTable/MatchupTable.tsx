import { useEffect, useState } from "react";
import { playerVsPlayer } from "../../../../api";
import PvPTable, { DataType } from "../../../../components/PvPTable/PvPTable";

interface Player {
  id: number;
  name: string;
  profile_picture_url: string | null;
}

interface Props {
  player: Player;
  opponent: Player;
}

const MatchupTable = ({ player, opponent }: Props) => {
  const [results, setResults] = useState<DataType[]>([]);

  useEffect(() => {
    playerVsPlayer(player.id, opponent.id)
      .then(results => {
        const formatResults: DataType[] = results.map(result => ({
          key: `${result.match_id}-${result.game_number}`,
          id: `${result.match_id}-${result.game_number}`,
          description: `${result.event_name}`,
          playerAResult: result.player1_result,
          playerAScore: result.player1_score.toLocaleString(),
          playerAStyle: result.player1_style,
          playerATopout: result.player1_topout,
          playerBResult: result.player2_result,
          playerBScore: result.player2_score.toLocaleString(),
          playerBStyle: result.player2_style,
          playerBTopout: result.player2_topout,
        }))
        setResults(formatResults);
      })
      .catch(error => console.log(error))
  }, [player.id, opponent.id]);

  return (
    <PvPTable
      playerA={player.name}
      playerB={opponent.name}
      data={results}
    />
  );
};

export default MatchupTable;
