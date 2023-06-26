import React from 'react';
import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ btnType = 'button', handleClick, children }) => {
  return (
    <Btn type={btnType} onClick={handleClick}>
      {children}
    </Btn>
  );
};

Button.propTypes = {
  btnType: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
