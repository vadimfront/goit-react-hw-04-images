import React from 'react';
import PropTypes from 'prop-types';
import { BtnIcon } from './IconButton.styled';

export const IconButton = ({
  type = 'button',
  additionalStyles,
  handleClick,
  children,
}) => {
  return (
    <BtnIcon
      type={type}
      additionalStyles={additionalStyles}
      onClick={handleClick}
    >
      {children}
    </BtnIcon>
  );
};

IconButton.propTypes = {
  type: PropTypes.string,
  additionalStyles: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
