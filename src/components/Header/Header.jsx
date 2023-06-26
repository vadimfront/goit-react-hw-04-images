import React from 'react';
import PropTypes from 'prop-types';
import { HeaderWrapper } from './Header.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import ContentWrap from 'components/Container/Container';

export const Header = ({ submitHandler }) => {
  return (
    <HeaderWrapper>
      <ContentWrap>
        <Searchbar submitHandler={submitHandler} />
      </ContentWrap>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  submitHandler: PropTypes.func,
};
