export interface IImageData {
  id: number;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  likes: number;
}

export interface IPage {
  currentPage: number;
  totalPages: number;
}

export interface IPhotoResponse {
  total_pages: number;
  results: IImageData[];
}
