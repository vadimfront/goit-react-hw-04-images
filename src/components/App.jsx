import React, { Component } from 'react';
import { Header } from './Header/Header';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';
import { AnimatePresence } from 'framer-motion';
import { notify } from 'utils/helpers';

export default class App extends Component {
  state = {
    searchTerm: '',
    isLoading: false,
    isModalOpen: false,
    modalContent: [],
  };

  submitHandler = e => {
    e.preventDefault();
    const { search } = Object.fromEntries(new FormData(e.target));
    if (!search.length) {
      notify('You did not enter a search string.', 'error');
      return;
    }
    if (this.state.searchTerm === search) {
      notify('You are trying to load the same search term', 'error');
    }
    this.setState({ searchTerm: search });
  };

  handlerLoader = status => {
    this.setState({ isLoading: status });
  };

  modalToggle = e => {
    if (e.currentTarget !== e.target) return;
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  setModalContent = content => {
    this.setState({ modalContent: content });
  };

  render() {
    const { searchTerm, isLoading, isModalOpen, modalContent } = this.state;

    return (
      <>
        <Header submitHandler={this.submitHandler} />
        <Gallery
          searchTerm={searchTerm}
          handlerLoader={this.handlerLoader}
          modalToggle={this.modalToggle}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setModalContent={this.setModalContent}
        />
        <AnimatePresence>
          {isModalOpen && modalContent ? (
            <Modal modalToggle={this.modalToggle} isModalOpen={isModalOpen}>
              {modalContent}
            </Modal>
          ) : null}
        </AnimatePresence>
      </>
    );
  }
}
