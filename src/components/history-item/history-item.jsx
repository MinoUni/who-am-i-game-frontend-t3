import clsx from 'clsx';
import { useMemo } from 'react';
import AnswerIcon from '../answer-icon/answer-icon';
import './history-item.scss';

function HistoryItem({ question, users, user, last }) {
  const { answers, type } = question;

  const message = question.question;
  const guess = type === 'guess';

  const answersByUserId = useMemo(() => {
    return answers.reduce((all, answer) => {
      return {
        ...all,
        [answer.player]: answer.answer,
      };
    }, {});
  }, [answers]);

  return (
    <div className="history-item">
      <div className={clsx('history-item__question', { guess })}>
        {guess && <span className="my-guess">My Guess</span>}
        <div className={clsx('history-item__avatar', user.avatar)}></div>
        <p>{message}</p>
      </div>
      <div className="history-item__icons-box">
        {users
          .filter((u) => (last ? user.id !== u.id : answersByUserId[u.id]))
          .map((user) => (
            <AnswerIcon
              key={user.id}
              user={user}
              status={answersByUserId[user.id]}
            />
          ))}
      </div>
    </div>
  );
}

export default HistoryItem;
