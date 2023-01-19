import './global.scss';
import { GameScreen } from './components/Game/GameScreen';
import { LobbyScreen } from './components/Lobby/LobbyScreen';
import { DEV } from './game/DEV';

DEV;
function App() {
  return (
    <>
      <LobbyScreen />
      <GameScreen />
    </>
  );
}

export default App;
