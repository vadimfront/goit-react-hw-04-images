import React from 'react';
import PropTypes from 'prop-types';
import { SectionWrap } from './Section.styled';

const Section = ({ children }) => {
  return <SectionWrap>{children}</SectionWrap>;
};

export default Section;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
