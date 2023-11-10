import { createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/Home/Home';
import { ROUTES } from './constants/routes';
import LatestLeaderboards from './pages/LatestLeaderboards/LatestLeaderboards';
import CustomLeaderboards from './pages/CustomLeaderboards/CustomLeaderboards';
import PlayerVsPlayer from './pages/PlayerVsPlayer/PlayerVsPlayer';
import PlayerProfile from './pages/PlayerProfile/PlayerProfile';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Homepage />
    ),
  },
  {
    path: ROUTES.LATEST_LEADERBOARDS,
    element: (
      <LatestLeaderboards />
    ),
  },
  {
    path: ROUTES.CUSTOM_LEADERBOARDS,
    element: (
      <CustomLeaderboards />
    ),
  },
  {
    path: ROUTES.PLAYER_PROFILE,
    element: (
      <PlayerProfile />
    ),
  },
  {
    path: ROUTES.PLAYER_VS_PLAYER,
    element: (
      <PlayerVsPlayer />
    ),
  },
]);

export default router;
