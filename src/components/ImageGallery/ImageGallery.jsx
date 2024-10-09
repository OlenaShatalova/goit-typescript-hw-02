import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ photos, isOpen }) => {
  return (
    <ul className={css.list}>
      {photos.map(photo => (
        <li key={photo.id} onClick={() => isOpen(photo)}>
          <ImageCard photo={photo} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
