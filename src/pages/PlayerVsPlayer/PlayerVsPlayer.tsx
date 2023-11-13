import { Typography } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import SearchUser from "../../components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import { playerVsPlayer } from "../../api";
import MatchupProfile from "./components/MatchupProfile";
import PvPTable, { DataType } from "../../components/PvPTable/PvPTable";

const PlayerVsPlayer = () => {
  const [value, setValue] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [results, setResults] = useState<DataType[]>([]);

  useEffect(() => {
    if (value && opponent) {
      playerVsPlayer(parseInt(value, 10), parseInt(opponent, 10))
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
    }
  }, [value, opponent]);

  return (
    <MainContainer>
      <Typography.Title level={1}>Head to Head Record in the CTM Masters Event</Typography.Title>
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={value}
        setValue={setValue}
      />
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={opponent}
        setValue={setOpponent}
      />
      {opponent && value && (
        <div>
          <MatchupProfile opponentId={+opponent} playerId={+value} />
          <PvPTable data={results} />
        </div>
      )}
    </MainContainer>
  );
};

export default PlayerVsPlayer;
