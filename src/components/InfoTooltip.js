import popupSignOk from "./../images/ok.svg";
import popupSignNo from "./../images/no.svg";

function InfoTooltip(props) {
  const { text, isOpen, name, sign, onClose } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img
          className="popup__sign"
          src={sign ? popupSignOk : popupSignNo}
          alt={sign ? "Ok" : "No"}
        />

        <p className="popup__message">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
