import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getHeroesList = async () => {
  return axios.get(`${baseUrl}/heroes`)
    .then((res) => res.data)
    .catch((error) => {
      return error.res;
    });
} 

export const getHeroDetails = async (id) => {
  return axios.get(`${baseUrl}/heroes/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      return error.res;
    });
} 
