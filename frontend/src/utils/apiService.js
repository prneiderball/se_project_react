const baseUrl = "http://localhost:3001";

function handleResponse(res) {
  if (!res.ok) {
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

function fetchClothingItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse).catch(handleError);
}

function postNewItem(item) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}

function deleteItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export const updateUserProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
};

export { handleResponse, fetchClothingItems, postNewItem, deleteItem };
