import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section/Section';
import { GalleryItem } from 'components/GalleryList/GalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container.styled';
import { GalleryImage, GalleryWrap } from './Gallery.styled';
import { fetchData } from 'utils/apiHelpers';
import { notify } from 'utils/helpers';

export default class Gallery extends Component {
  state = {
    imagesData: [],
    activeImage: null,
    imageIndex: 0,
    hitsToEnd: 0,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchTerm, handlerLoader } = this.props;
    const { hitsToEnd } = this.state;

    if (searchTerm.length && prevProps.searchTerm !== searchTerm) {
      const { hits, totalHits } = await fetchData(searchTerm, 1, handlerLoader);
      this.setState({
        imagesData: hits,
        hitsToEnd: totalHits - 12,
        page: 1,
      });
    }
    if (prevState.hitsToEnd !== hitsToEnd && hitsToEnd <= 0) {
      notify('There are no images to load.', 'info');
    }
  }

  loadMore = async () => {
    const { page } = this.state;
    const { searchTerm, handlerLoader } = this.props;
    const { hits } = await fetchData(searchTerm, page + 1, handlerLoader);

    this.setState(prevState => ({
      imagesData: [...prevState.imagesData, ...hits],
      hitsToEnd: prevState.hitsToEnd - 12,
      page: prevState.page + 1,
    }));
  };

  selectActiveImage = id => {
    const activeImageIndex = this.state.imagesData.findIndex(
      image => image.id === id
    );
    this.setState({
      imageIndex: activeImageIndex,
    });
    return this.initialImageToShow(activeImageIndex);
  };

  initialImageToShow = index => {
    const { largeImageURL, tags } = this.state.imagesData[index];
    return <GalleryImage key={index} src={largeImageURL} alt={tags} />;
  };

  handleClick = (e, id) => {
    const { setModalContent, modalToggle } = this.props;
    const markup = this.selectActiveImage(id);
    setModalContent(markup);
    modalToggle(e);
  };

  render() {
    const { imagesData, hitsToEnd } = this.state;
    const { isLoading } = this.props;

    const loader = isLoading ? <Loader /> : null;
    const content = !(isLoading && !imagesData.length) ? (
      <View imagesData={imagesData} handleClick={this.handleClick} />
    ) : null;
    const btnLoadMore =
      !isLoading && hitsToEnd > 0 ? (
        <Button handleClick={this.loadMore}>Load More</Button>
      ) : null;

    return (
      <>
        {loader}
        {content}
        {btnLoadMore}
      </>
    );
  }
}

Gallery.propTypes = {
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
                  <GalleryItem
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
