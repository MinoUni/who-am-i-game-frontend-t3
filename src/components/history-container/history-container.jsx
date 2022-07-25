import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import {
  answerQuestion,
  askQuestion,
  getHistory,
  answerGuess,
} from '../../services/games-service';
import {
  ANSWERED,
  ANSWERING,
  ASKED,
  ASKING,
  GUESSING,
  WAITING,
} from '../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';

function HistoryContainer({ currentPlayer, players, playerTurn }) {
  const { gameData, playerId, fetchGame } = useContext(GameDataContext);
  const bottomElement = useRef(null);
  const [historyData, setHistoryData] = useState({
    currentQuestion: null,
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const mode = currentPlayer.playerState;
  const playersByIds = gameData.playersById;

  const history = historyData.questions;
  const activeQuestion = historyData.currentQuestion;
  const playerAnswered = !!currentPlayer.answer;
  const allPlayersAnswered =
    history.length > 0
      ? history[history.length - 1].answers.length >= players.length
      : null;

  const allPlayers = useMemo(
    () => Object.values(gameData.playersById),
    [gameData.playersById]
  );

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [history.length]);

  const fetchHistory = useMemo(
    () =>
      debounce(async function () {
        if (!gameData.id) {
          return;
        }
        const { data } = await getHistory(gameData.id);
        setHistoryData(data);
      }, 200),
    [gameData.id]
  );

  useEffect(() => {
    fetchHistory();
  }, [
    playerTurn?.id,
    playerTurn?.playerState,
    fetchHistory,
    currentPlayer.answer,
  ]);

  const submitAsk = useCallback(
    async (question) => {
      setLoading(true);
      try {
        await askQuestion(playerId, gameData.id, question);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswer = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerQuestion(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  const submitAnswerGuess = useCallback(
    async (answer) => {
      setLoading(true);
      try {
        await answerGuess(playerId, gameData.id, answer);
        await fetchGame();
      } catch (error) {
        //to do: handle error
      }
      setLoading(false);
    },
    [fetchGame, gameData.id, playerId]
  );

  return (
    <div className="history">
      <div className="history_list">
        {history.map((item, index) => {
          if (!playersByIds[item.player]) {
            return null;
          }
          const last = history.length - 1 === index;

          return (
            <HistoryItem
              question={item}
              key={index}
              user={playersByIds[item.player]}
              users={last ? gameData.players : allPlayers}
              last={last}
            />
          );
        })}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      <div className="history_bottom">
        {mode === ASKING && (
          <QuestionForm onSubmit={submitAsk} disabled={loading} />
        )}
        {mode === ANSWERING &&
          playerTurn.playerState === ASKED &&
          history.length !== 0 &&
          !playerAnswered &&
          !allPlayersAnswered && (
            <AnswerForm
              mode={activeQuestion?.type === 'guess' ? GUESSING : ANSWERING}
              onSubmit={
                activeQuestion?.type === 'guess'
                  ? submitAnswerGuess
                  : submitAnswer
              }
              disabled={loading}
            />
          )}
        {mode === ANSWERED && (
          <MessageBlock mode={WAITING} message={currentPlayer.answer} />
        )}
      </div>
    </div>
  );
}

export default HistoryContainer;
