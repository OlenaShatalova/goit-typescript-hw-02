import { IImageData } from '../App/App.types';

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: IImageData;
}
