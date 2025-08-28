const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  if (!res.ok) {
    if (res.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem("jwt");
    }
    throw new Error(
      `Network response was not ok: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

function handleError(error) {
  console.error("There has been a problem with your fetch operation:", error);
  throw error;
}

function getHeaders() {
  const token = localStorage.getItem("jwt");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function fetchClothingItems() {
  return fetch(`${baseUrl}/items`, {
    headers: getHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}

function postNewItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}

export const updateUserProfile = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
};

export function addCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function removeCardLike(itemId) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveToken(token) {
  localStorage.setItem("jwt", token);
}

export { handleResponse, fetchClothingItems, postNewItem, deleteItem };
