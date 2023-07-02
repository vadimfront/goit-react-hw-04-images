import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section/Section';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container.styled';
import { GalleryImage, GalleryWrap } from './ImageGallery.styled';
import { fetchData } from 'utils/apiHelpers';
import { notify } from 'utils/helpers';
import { CustomModalContext } from 'hooks/ContextModal';

const ImageGallery = ({ searchTerm }) => {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hitsToEnd, setHitsToEnd] = useState(0);

  const { initialModalContent, modalToggle } = useContext(CustomModalContext);

  useEffect(() => {
    setPage(1);

    const getSearchData = async () => {
      const { hits, totalHits } = await fetchData(searchTerm, 1, setIsLoading);
      if (!totalHits) notify(`No images found for ${searchTerm}`, 'info');
      setImagesData(hits);
      const hitsToEnd = totalHits - hits.length;
      setHitsToEnd(hitsToEnd);
    };

    if (searchTerm.length) getSearchData();
  }, [searchTerm]);

  useEffect(() => {
    if (page > 1) {
      const fetchLoadMore = async () => {
        const { hits } = await fetchData(searchTerm, page, setIsLoading);
        setImagesData(prevState => [...prevState, ...hits]);
      };
      fetchLoadMore();
      if (hitsToEnd <= 0) notify('There are no images to load.', 'info');
    }
  }, [page, searchTerm, hitsToEnd]);

  const loadMore = async () => {
    setPage(prevPage => prevPage + 1);
    setHitsToEnd(prevPage => prevPage - 12);
  };

  const selectActiveImage = itemId => {
    const activeImageIndex = imagesData.findIndex(image => image.id === itemId);

    const { largeImageURL, tags } = imagesData[activeImageIndex];
    initialModalContent(
      <GalleryImage key={itemId} src={largeImageURL} alt={tags} />
    );
  };

  const handleClick = (e, id) => {
    selectActiveImage(id);
    modalToggle(e);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!(isLoading && !imagesData.length) && (
        <View imagesData={imagesData} handleClick={handleClick} />
      )}
      {!isLoading && hitsToEnd > 0 && (
        <Button handleClick={loadMore}>Load More</Button>
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchTerm: PropTypes.string,
  modalToggle: PropTypes.func,
  setModalContent: PropTypes.func,
  handlerLoader: PropTypes.func,
  isLoading: PropTypes.bool,
};

const View = ({ imagesData, handleClick }) => {
  return (
    <Section>
      <Container>
        <GalleryWrap>
          {imagesData.length
            ? imagesData.map(image => {
                const { id } = image;
                return (
                  <ImageGalleryItem
                    key={id}
                    imagesOption={image}
                    handleClick={e => handleClick(e, id)}
                  />
                );
              })
            : null}
        </GalleryWrap>
      </Container>
    </Section>
  );
};

View.propTypes = {
  imagesData: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
};
