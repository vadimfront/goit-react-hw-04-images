import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseSvgIcon, ModalContent, Overlay } from './Modal.styled';

import { IconButton } from 'components/IconButton/IconButton';
import { CustomModalContext } from 'hooks/ContextModal';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  const { isModalOpen, modalToggle } = useContext(CustomModalContext);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalToggle(e);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, modalToggle]);

  const additionalStyles = `
      position: absolute;
      top: 15px;
      right: 15px
    `;

  return createPortal(
    <>
      {isModalOpen && (
        <Overlay
          key="modal-overlay"
          onClick={modalToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalContent
            initial={{ opacity: 0, marginTop: '-50px' }}
            animate={{ opacity: 1, marginTop: '0' }}
            exit={{ opacity: 0, marginTop: '-50px' }}
            transition={{ duration: 1 }}
          >
            <IconButton
              additionalStyles={additionalStyles}
              handleClick={modalToggle}
            >
              <CloseSvgIcon fill="#fff" />
            </IconButton>
            {children}
          </ModalContent>
        </Overlay>
      )}
    </>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  modalToggle: PropTypes.func,
  children: PropTypes.node.isRequired,
};
