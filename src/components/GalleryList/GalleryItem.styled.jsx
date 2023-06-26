import styled from '@emotion/styled';

import { motion } from 'framer-motion';

const GalleryLi = styled(motion.li)`
  flex-basis: calc((100% - 45px) / 4);
  @media (max-width: 1024px) {
    flex-basis: calc((100% - 30px) / 3);
  }
  @media (max-width: 768px) {
    flex-basis: calc((100% - 15px) / 2);
  }
  @media (max-width: 414px) {
    flex-basis: 100%;
  }
`;
const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export { GalleryLi, GalleryImage };
