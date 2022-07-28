import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import PlayerCard from '../player-card/player-card';
import ModalContext from '../../contexts/modal-context';
import './users-container.scss';
import { useContext, useCallback } from 'react';
import { ASKED, ANSWERED, INACTIVE } from '../../constants/constants';
import GameDataContext from '../../contexts/game-data-context';
import { useNavigate } from 'react-router-dom';

function UsersContainer({ currentPlayer, players, playerTurn }) {
  const { leaveGame } = useContext(GameDataContext);
  const navigate = useNavigate();
  const modalActive = useContext(ModalContext)[0];

  const onTimerFinish = useCallback(
    async function () {
      if (currentPlayer.playerState === ASKED) {
        return;
      }

      if (currentPlayer.playerState === ANSWERED) {
        return;
      }

      try {
        await leaveGame();
        navigate(INACTIVE);
      } catch {
        //todo: handle errors
      }
    },
    [currentPlayer.playerState, leaveGame, navigate]
  );

  return (
    <div className="users">
      <div className="users__timer-container">
        <p className="users__turn">TURN TIME</p>
        <CountdownTimer
          small={'v-small'}
          time={playerTurn?.playerState === ASKED ? 20 : 60}
          paused={modalActive}
          onFinish={onTimerFinish}
        />
      </div>
      {currentPlayer && (
        <PlayerCard
          className="in-users-container"
          avatarClassName={currentPlayer.avatar}
          name={currentPlayer.name}
          assignedCharacter="This is you"
          active={currentPlayer.id === playerTurn?.id}
        />
      )}
      <hr />
      <div className="users__list">
        {players
          ? players.map((player, index) => (
              <PlayerCard
                className="in-users-container"
                key={player.id}
                name={player.name}
                avatarClassName={player.avatar}
                assignedCharacter={player.character}
                active={player.id === playerTurn?.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default UsersContainer;
