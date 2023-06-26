import { css } from '@emotion/react';
import styled from '@emotion/styled';

const BtnIcon = styled.button`
  background-color: transparent;
  color: #000;
  border: none;
  padding: 2px 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  ${({ additionalStyles }) => css`
    ${additionalStyles}
  `}
  &:hover > svg {
    fill: #f1c40f;
  }
`;

export { BtnIcon };
