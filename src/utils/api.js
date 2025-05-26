const baseUrl = 'http://localhost:3001';

function fetchClothingItems() {
    return fetch(baseUrl + '/items')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            throw error;
        });
}

export { fetchClothingItems };