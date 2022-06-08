import './leave-game.scss';

function LeaveGameModal({ showModal, setModalActive }) {
  if (!showModal) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setModalActive(false);
      }}
      className="modal-container"
    >
      <div className="modal-container__title-container">
        <h3 className="modal-container__title">LEAVE THE GAME</h3>
        <button
          className="modal-container__cross-btn"
          onClick={() => {
            setModalActive(false);
          }}
        />
      </div>
      <p className="modal-container__question">
        Are you sure you want to leave the game?
      </p>
      <div className="modal-container__selector-container">
        <button type="submit" className="modal-container__leave-btn">
          LEAVE
        </button>
        <button
          className="modal-container__cancel-btn"
          onClick={() => {
            setModalActive(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}

export default LeaveGameModal;