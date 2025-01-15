import "./error.css";

const ErrorModal = ({ message, handleModalClose }) => {
  return (
    <div className="error-modal">
      <div className="error-content">
        <h2 className="error-text">{message}</h2>
        <button onClick={handleModalClose} className="error-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
