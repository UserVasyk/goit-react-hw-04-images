import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';
export const Modal = ({ onOpenModal, largeImageURL }) => {
  useEffect(() => {
    const onKeyDown = evt => {
      console.log('evt: ', evt);

      if (evt.key === 'Escape') {
        onOpenModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onOpenModal]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onOpenModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalBox>
        <img width={900} src={largeImageURL} alt={largeImageURL} />
      </ModalBox>
    </Overlay>
  );
};
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
