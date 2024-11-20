import ReactModal from 'react-modal';
import { SlLike } from 'react-icons/sl';
import { ImageModalProps } from './ImageModal.types';
import css from './ImageModal.module.css';

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  selectedImage,
}) => {
  const { urls, alt_description, likes } = selectedImage;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.modal_overlay}
      className={css.modal_content}
      ariaHideApp={false}
    >
      <img src={urls.regular} alt={alt_description} />
      <div className={css.img_descr}>
        <p>
          <SlLike className={css.icon} size={24} />
          {likes}
        </p>
        <p>{alt_description}</p>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
