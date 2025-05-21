import axios from 'axios';
 
const API_URL = 'http://localhost:3001/joueurs';
 
/*export const fetchMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};*/
 
export const createJoueur = async (joueur) => {
  const response = await axios.post(API_URL, joueur);
  return response.data;
};
 
export const updateJoueur = async (id, joueur) => {
  const response = await axios.put(`${API_URL}/${id}`, joueur);
  return response.data;
};
 
export const deleteJoueur = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchJoueur = async (id) => {
    id = id || '';
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };
  