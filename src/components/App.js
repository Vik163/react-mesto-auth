import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "./Login.js";
import Register from "./Register.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "./../utils/api.js";
import { auth } from "../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [logInfo, setLogInfo] = useState({
    id: "",
    email: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddInfoTooltip, setIsAddInfoTooltip] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [messageInfoTooltip, setMessageInfoTooltip] = useState("");
  const [isAddConfirmPopupOpen, setIsAddConfirmPopupOpen] = useState(false);
  const [valueSubmit, setValueSubmit] = useState("Сохранить");
  const [valueSubmitDeleteCard, setValueSubmitDeleteCard] = useState("Да");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLogInfo({
              id: res.data._id,
              email: res.data.email,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleRegister({ password, email }) {
    return auth
      .registration(password, email)
      .then((res) => {
        if (res) {
          setMessageInfoTooltip("Вы успешно зарегистрировались!");
          setIsSign(true);

          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
        setIsSign(false);
      })
      .finally(() => {
        setIsAddInfoTooltip(true);
      });
  }

  function handleLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          checkToken();

          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setLogInfo({
      id: null,
      email: null,
    });
    history.push("/sign-in");
  }

  function handleAddPlaceSubmit(obj, clearInput) {
    setValueSubmit("Сохранение...");
    api
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        clearInput();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();

    setValueSubmitDeleteCard("Сохранение...");
    api
      .deleteCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => !(c._id === cardDelete._id)));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmitDeleteCard("Да");
      });
  }

  function onConfirmDelete(card) {
    setIsAddConfirmPopupOpen(true);
    setCardDelete(card);
  }

  function handleUpdateUser(obj) {
    setValueSubmit("Сохранение...");

    api
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const action = isLiked ? api.deleteLike(card) : api.addLikes(card);
    action
      .then((result) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? result : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateAvatar(avatar, clearInput) {
    setValueSubmit("Сохранение...");
    api
      .addAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
        clearInput();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit("Сохранить");
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsAddConfirmPopupOpen(false);
    setIsAddInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} />

          <Route path="/sign-up">
            <InfoTooltip
              sign={isSign}
              isOpen={isAddInfoTooltip}
              onClose={closeAllPopups}
              text={messageInfoTooltip}
            />
            <Header
              infoLink="Войти"
              link="/sign-in"
              signOut={null}
              email={null}
            />
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <InfoTooltip
              sign={isSign}
              isOpen={isAddInfoTooltip}
              onClose={closeAllPopups}
              text={messageInfoTooltip}
            />
            <Header
              infoLink="Регистрация"
              link="/sign-up"
              signOut={null}
              email={null}
            />
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/main" loggedIn={loggedIn}>
            <Header
              infoLink="Выйти"
              signOut={signOut}
              link="/sign-in"
              email={logInfo.email}
            />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onImagePopup={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={onConfirmDelete}
              cards={cards}
            />
            <Footer />
            <section className="popups" tabIndex="0">
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                text={valueSubmit}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                text={valueSubmit}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                text={valueSubmit}
              />

              <PopupWithForm
                name="delete-card"
                title="Вы уверены?"
                text={valueSubmitDeleteCard}
                isOpen={isAddConfirmPopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleCardDelete}
              ></PopupWithForm>
              <ImagePopup
                name="image"
                card={selectedCard}
                onClose={closeAllPopups}
              />
            </section>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
