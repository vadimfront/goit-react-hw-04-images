import React from 'react';
import PropTypes from 'prop-types';
import { FormSearch, InputSearch, SearchContainer } from './Searchbar.styled';
import { IconButton } from 'components/IconButton/IconButton';
import { ReactComponent as SearchIcon } from '../../icons/searchIcon.svg';

const Searchbar = ({ submitHandler }) => {
  return (
    <FormSearch onSubmit={submitHandler}>
      <SearchContainer>
        <IconButton type="submit">
          <SearchIcon fill="#fff" />
        </IconButton>
        <InputSearch type="text" name="search" />
      </SearchContainer>
    </FormSearch>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  submitHandler: PropTypes.func,
};
