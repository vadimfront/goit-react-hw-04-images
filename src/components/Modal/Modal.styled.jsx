import styled from '@emotion/styled';
import { ReactComponent as IconClose } from '../../icons/closeIcon.svg';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
const ModalContent = styled.div`
  padding: 0 15px;
  appearance: ${props => (props.isModalOpen ? 'auto' : 'none')};
  z-index: 1;
`;

const CloseSvgIcon = styled(IconClose)`
  pointer-events: none;
`;

export { Overlay, ModalContent, CloseSvgIcon };
