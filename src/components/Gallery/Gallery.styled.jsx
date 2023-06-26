import styled from '@emotion/styled';

const GalleryWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  list-style: none;
  gap: 15px;
  padding-left: 0;
`;

const GalleryImage = styled.img`
  max-width: 1024px;
  width: 100%;
`;

export { GalleryWrap, GalleryImage };
