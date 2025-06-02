const baseUrl = 'http://localhost:3001';

function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function handleError(error) {
  console.error('There has been a problem with your fetch operation:', error);
  throw error;
}

function fetchClothingItems() {
  return fetch(`${baseUrl}/items`)
    .then(handleResponse)
    .catch(handleError);
}

function postNewItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export { handleResponse, fetchClothingItems, postNewItem, deleteItem };
