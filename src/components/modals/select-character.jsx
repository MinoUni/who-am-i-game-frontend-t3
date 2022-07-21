import { useState } from 'react';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import './modal.scss';

function SelectCharacterModal({ player, active, onCancel, onSubmit }) {
  const [playerName, setPlayerName] = useState(player);
  const [characterName, setCharacterName] = useState('');

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="SUGGEST A CHARACTER" onCancel={onCancel}>
      <form
        className="modal-form"
        onSubmit={(event) => onSubmit(event, playerName, characterName)}
      >
        <input
          className="modal__input-field"
          type="text"
          maxLength="50"
          value={playerName}
          onInput={(e) => {
            setPlayerName(e.target.value);
          }}
        />
        <input
          className="modal__input-field"
          type="text"
          placeholder="Suggest a character"
          maxLength="50"
          value={characterName}
          onInput={(e) => {
            setCharacterName(e.target.value);
          }}
        />
        <Btn
          className="btn-green-solid"
          disabled={
            (playerName && playerName.trim().length < 2) ||
            characterName.trim().length < 2
          }
          type="submit"
        >
          SUGGEST
        </Btn>
      </form>
    </ModalWrapper>
  );
}

export default SelectCharacterModal;
