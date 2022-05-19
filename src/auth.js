class Auth {
  constructor(settings) {
    this._settings = settings;
  }

  registration(password, email) {
    return fetch(`${this._settings.baseUrl}/signup`, {
      method: "POST",
      headers: {
        // authorization: `${this._settings.headers.authorization}`,

        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    });
  }

  authorization(password, email) {
    // console.log(password);
    // console.log(email);
    return fetch(`${this._settings.baseUrl}/signin`, {
      method: "POST",
      headers: {
        // authorization: `${this._settings.headers.authorization}`,

        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    });
  }

  getContent(jwt) {
    // console.log(jwt);

    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        // authorization: `${this._settings.headers.authorization}`,

        // Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    });
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    authorization: "fcbbb83d-e200-4418-b5ab-2457f84f25b4",
    "Content-Type": "application/json",
  },
});
