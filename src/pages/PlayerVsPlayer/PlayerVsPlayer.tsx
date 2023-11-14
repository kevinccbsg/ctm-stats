import { Typography } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import SearchUser from "../../components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import MatchupProfile from "./components/MatchupProfile/MatchupProfile";
import MatchupTable from "./components/MatchupTable/MatchupTable";
import usePlayers from "./hooks/usePlayers";

const PlayerVsPlayer = () => {
  const [value, setValue] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string | null>(null);
  const { playersInfo, setPlayers } = usePlayers();

  useEffect(() => {
    if (value && opponent) {
      setPlayers(+value, +opponent)
        .catch(error => {
          console.log(error);
        });
    }
  }, [value, opponent, setPlayers]);
  console.log('re-render');
  
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
      {playersInfo && (
        <div>
          <MatchupProfile opponent={playersInfo.opponent} player={playersInfo.player} />
          <MatchupTable opponent={playersInfo.opponent} player={playersInfo.player}  />
        </div>
      )}
    </MainContainer>
  );
};

export default PlayerVsPlayer;
