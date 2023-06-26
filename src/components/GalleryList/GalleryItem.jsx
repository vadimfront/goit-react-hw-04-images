import React from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryLi } from './GalleryItem.styled';
import { AnimatePresence } from 'framer-motion';

export const GalleryItem = ({ imagesOption, handleClick }) => {
  const { id, webformatURL, tags } = imagesOption;

  return (
    <AnimatePresence>
      <GalleryLi key={id} initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
        <GalleryImage
          src={webformatURL}
          alt={tags}
          onClick={e => handleClick(e, id)}
        />
      </GalleryLi>
    </AnimatePresence>
  );
};

GalleryItem.propsTypes = {
  imagesOption: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};
