import React from 'react';
import { ReactComponent as IconLoader } from '../../icons/loader.svg';
import { Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spinner>
      <IconLoader />
    </Spinner>
  );
};
