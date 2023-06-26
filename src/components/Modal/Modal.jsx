import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseSvgIcon, ModalContent, Overlay } from './Modal.styled';

import { IconButton } from 'components/IconButton/IconButton';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalToggle(e);
    }
  };

  render() {
    const { isModalOpen, children, modalToggle } = this.props;

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
            <ModalContent>
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
  }
}

Modal.propTypes = {
  modalToggle: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
