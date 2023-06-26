import axios from 'axios';
import { apiKey, urlApi } from 'components/constants';

const pixabayApi = axios.create({
  baseURL: urlApi,
  params: {
    key: apiKey,
  },
});

export { pixabayApi };
