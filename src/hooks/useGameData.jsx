import { useRef, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LOADING,
  LOBBY,
  PLAY,
  PROCESSING_QUESTION,
  SUGGESTING_CHARACTERS,
  WAITING_FOR_PLAYERS,
  VICTORY,
  DEFEAT,
  FINISHED,
  LOST,
} from '../constants/constants';
import GameDataContext from '../contexts/game-data-context';
import { promiseStatus, PromiseStatuses } from 'promise-status-async';
import useInterval from './useInterval';

export default function useGameData() {
  const { gameData, resetData, playerId, fetchGame } =
    useContext(GameDataContext);
  const navigate = useNavigate();
  const promiseRef = useRef();

  const tickHandler = useCallback(async () => {
    const status = await promiseStatus(promiseRef.current);

    if (
      status === PromiseStatuses.PROMISE_PENDING ||
      status === PromiseStatuses.PROMISE_REJECTED
    ) {
      return;
    }

    promiseRef.current = fetchGame();
  }, [fetchGame]);
  useInterval(tickHandler, 1300);

  useEffect(() => {
    if (!gameData.id && !sessionStorage.gameId) {
      resetData();
      navigate('/');

      return;
    }

    if (gameData.playersById[playerId]?.playerState === FINISHED) {
      navigate(VICTORY);

      return;
    }

    if (gameData.playersById[playerId]?.playerState === LOST) {
      navigate(DEFEAT);

      return;
    }

    if (gameData.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);

      return;
    }

    if (gameData.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);

      return;
    }

    if (gameData.status === PROCESSING_QUESTION) {
      navigate(PLAY);

      return;
    }
  }, [gameData, resetData, playerId, navigate]);

  return;
}
