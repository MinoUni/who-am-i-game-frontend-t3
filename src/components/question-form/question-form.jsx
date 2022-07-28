import ModalContext from '../../contexts/modal-context';
import Btn from '../btn/btn';
import { useContext, useState } from 'react';
import './question-form.scss';
import { useCallback } from 'react';

function QuestionForm({ disabled, onSubmit }) {
  const setModalActive = useContext(ModalContext)[1];
  const [question, setQuestion] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (event.target.elements.question.value) {
        onSubmit(event.target.elements.question.value);
      }
    },
    [onSubmit]
  );

  return (
    <div className="form">
      <form className="row" onSubmit={handleSubmit}>
        <input
          name="question"
          className="input_field"
          type="text"
          placeholder="Type your question"
          maxLength="256"
          minLength="2"
          pattern="^[^\s]+(\s.*)?$"
          value={question}
          onChange={(e) => {
              const rules = e.target.value.replace(/[^а-яіїєґА-ЯІЇЄҐa-zA-Z.,!? ()\s]/g, '');
              setQuestion(rules);
          }}
        />
        <button disabled={disabled} type="submit" className="btn btn_ask">
          Ask
        </button>
      </form>
      <Btn
        disabled={disabled}
        className="btn-yellow-solid"
        onClick={() => setModalActive(true)}
      >
        I AM READY TO GUESS
      </Btn>
    </div>
  );
}

export default QuestionForm;
