import { createContext, useState } from 'react';

export const CustomModalContext = createContext();

export const ContextModal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const modalToggle = e => {
    if (e.currentTarget !== e.target && e.code !== 'Escape') return;
    setIsModalOpen(prevState => !prevState);
  };

  const initialModalContent = content => {
    setModalContent(content);
  };

  const value = {
    isModalOpen,
    modalContent,
    modalToggle,
    initialModalContent,
  };

  return (
    <CustomModalContext.Provider value={value}>
      {props.children}
    </CustomModalContext.Provider>
  );
};
