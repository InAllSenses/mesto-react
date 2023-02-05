class Api {
  constructor(token, baseUrl) {
    this._token = token;
    this._baseUrl = baseUrl;

    this._headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _handleFetchResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._handleFetchResult);
  }

  patchUserInfo({ name, info }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    }).then(this._handleFetchResult);
  }

  patchAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    }).then(this._handleFetchResult);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._handleFetchResult);
  }

  postNewCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleFetchResult);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleFetchResult);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleFetchResult);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleFetchResult);
  }
}



// INITIALIZATION
const apiToken = "1131d0bd-5b8f-45fb-8061-570667973a92";
const apiBaseUrl = "https://mesto.nomoreparties.co/v1/cohort-50";

const api = new Api(apiToken, apiBaseUrl);

export default api;