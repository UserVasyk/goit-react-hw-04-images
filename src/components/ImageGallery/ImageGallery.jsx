import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState('');

  const onOpenModal = image => {
    setIsActive(prev => !prev);
    setImage(image);
  };

  return (
    <ImageGalleryStyled>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          onOpenModal={() => onOpenModal(largeImageURL)}
          key={id}
          webformatURL={webformatURL}
        />
      ))}
      {isActive && <Modal onOpenModal={onOpenModal} largeImageURL={image} />}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
