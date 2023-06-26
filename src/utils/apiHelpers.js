import { pixabayApi } from 'axios.config';

export const fetchData = async (searchTerm, page, loader) => {
  loader(true);
  try {
    const response = await pixabayApi.get(
      `/?q=${searchTerm}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = response.data;
    loader(false);
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
    loader(false);
  }
};
