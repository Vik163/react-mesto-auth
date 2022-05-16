function PopupWithForm(props) {
  const { text, isOpen, name, title, onClose, onSubmit, children } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="popup__close button-hover"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <form
          onSubmit={onSubmit}
          action="#"
          name={name}
          className={`popup__form popup__form_type_${name}`}
          noValidate
        >
          {children}
          <button className="popup__submit button-hover" type="submit">
            {text}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
