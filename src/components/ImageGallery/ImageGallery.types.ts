import { IImageData } from '../App/App.types';

export interface ImageGalleryProps {
  photos: IImageData[];
  isOpen: (photo: IImageData) => void;
}
