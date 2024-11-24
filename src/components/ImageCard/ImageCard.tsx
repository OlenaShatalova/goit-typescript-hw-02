import css from './ImageCard.module.css';
import 

const ImageCard = ({ photo }: object) => {
  console.log(photo);
  
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
