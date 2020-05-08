import axios from 'axios';

export default {
    // Gets all books
    getFavorites() {
        return axios.get(`/api/favorites`);
    },
    // Deletes the book with the given id
    deleteFavorites(id) {
        return axios.delete(`/api/favorites/${ id}`);
    },
    // Saves a book to the database
    saveFavorites(favoritesData) {
        return axios.post(`/api/favorites`, favoritesData);
    },
    searchcharity: function(query) {
        return axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=3c0fc420&app_key=0c12428e18e7fb50a1af2d2a834c2eaf&pageSize=25&search=' + query +'&rated=true');
      }
};
