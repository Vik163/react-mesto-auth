function ImagePopup(props) {
  const { card, name, onClose } = props;

  return (
    <div
      className={`popup popup_type_${name} ${card.link && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__container-image">
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
