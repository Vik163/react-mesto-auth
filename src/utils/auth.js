class Auth {
  constructor(settings) {
    this._settings = settings;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.statusText}`);
  }

  registration(password, email) {
    return fetch(`${this._settings.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  authorization(password, email) {
    return fetch(`${this._settings.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
    "Content-Type": "application/json",
  },
});
