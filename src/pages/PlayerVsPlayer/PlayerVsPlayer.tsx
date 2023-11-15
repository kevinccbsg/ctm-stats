import { Typography, message } from "antd";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import SearchUser from "../../components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import MatchupProfile from "./components/MatchupProfile/MatchupProfile";
import MatchupTable from "./components/MatchupTable/MatchupTable";
import usePlayers from "./hooks/usePlayers";
import { useSearchParams } from "react-router-dom";

const PlayerVsPlayer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams({});
  const [value, setValue] = useState<string | null>(searchParams.get('player_1_filter'));
  const [opponent, setOpponent] = useState<string | null>(searchParams.get('player_2_filter'));
  const { playersInfo, setPlayers } = usePlayers();

  useEffect(() => {
    const urlPlayer1 = searchParams.get('player_1');
    const urlPlayer2 = searchParams.get('player_2');
    if (urlPlayer1 && urlPlayer2) {
      setPlayers(+urlPlayer1, +urlPlayer2)
        .catch(() => {
          messageApi.open({
            type: 'error',
            content: 'Error fetching match info'
          });
        });
    }
  }, [searchParams, setPlayers, messageApi]);
  
  return (
    <MainContainer>
      {contextHolder}
      <Typography.Title level={1}>Head to Head Record in the CTM Masters Event</Typography.Title>
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={value}
        setValue={setValue}
        persistenceOptions={{
          id: 'player_1',
          label: 'player_1_filter',
        }}
      />
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={opponent}
        setValue={setOpponent}
        persistenceOptions={{
          id: 'player_2',
          label: 'player_2_filter',
        }}
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
