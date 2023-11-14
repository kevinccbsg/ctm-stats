import { useCallback, useState } from "react";
import { getPlayers } from "../../../api";

interface Player {
  id: number;
  name: string;
  profile_picture_url: string | null;
}

interface InfoData {
  player: Player;
  opponent: Player;
}

const usePlayers = () => {
  const [playersInfo, setPlayersInfo] = useState<InfoData | null>(null);

  const setPlayers = useCallback(async (playerId: number, opponentId: number) => {
    const players = await getPlayers(playerId, opponentId)
    setPlayersInfo(players);
  }, []);
  return { playersInfo, setPlayers };
};

export default usePlayers;
