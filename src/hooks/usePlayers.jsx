import { useEffect } from 'react';
import { useContext } from 'react';
import { ASKED, ASKING, GUESSING } from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';

export default function usePlayers() {
  const { gameData, playerId } = useContext(GameDataContext);

  const playersData = gameData.players.reduce(
    (obj, player) => {
      if (
        player.playerState === ASKING ||
        player.playerState === GUESSING ||
        player.playerState === ASKED
      ) {
        obj.playerTurn = player;
      }

      if (player.id === playerId) {
        obj.currentPlayer = player;

        return obj;
      }

      obj.playersWithoutCurrent.push(player);

      return obj;
    },
    { byIds: gameData.playersById, playersWithoutCurrent: [] }
  );

  const { currentPlayer } = playersData;

  useEffect(() => {
    sessionStorage.setItem('avatar', currentPlayer?.avatar);
    sessionStorage.setItem('name', currentPlayer?.nickname);
  }, [currentPlayer?.avatar, currentPlayer?.nickname]);

  return playersData;
}
