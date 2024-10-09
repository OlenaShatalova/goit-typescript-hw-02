import css from './ImageCard.module.css';

const ImageCard = ({ photo }) => {
  return (
    <div className={css.thumb}>
      <img
        src={photo.urls.small}
        alt={photo.alt_description}
        className={css.img}
      />
    </div>
  );
};

export default ImageCard;
