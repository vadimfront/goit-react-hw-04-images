import React, { useContext, useState } from 'react';
import { Header } from './Header/Header';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import { notify } from 'utils/helpers';
import { CustomModalContext } from 'hooks/ContextModal';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isModalOpen, modalContent } = useContext(CustomModalContext);

  const submitHandler = e => {
    e.preventDefault();
    const { search } = Object.fromEntries(new FormData(e.target));
    const searchValue = search.trim();
    if (!searchValue.length) {
      notify('You did not enter a search string.', 'error');
      return;
    }
    if (searchTerm === searchValue) {
      notify('You are trying to load the same search term', 'error');
    }
    setSearchTerm(searchValue);
  };

  return (
    <>
      <Header submitHandler={submitHandler} />
      <ImageGallery searchTerm={searchTerm} />
      <AnimatePresence>
        {isModalOpen && modalContent ? <Modal>{modalContent}</Modal> : null}
      </AnimatePresence>
    </>
  );
};

export default App;
