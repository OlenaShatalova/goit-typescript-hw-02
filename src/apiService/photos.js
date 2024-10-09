import axios from 'axios';

const API_KEY = 'YmeqEEevrarvG7Seo8nhFGuSiQOwBqQUHIqZtRYHjvM';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;

axios.defaults.params = {
  orientation: 'landscape',
  per_page: 28,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(`search/photos?query=${query}&page=${page}`);

  return data;
};
