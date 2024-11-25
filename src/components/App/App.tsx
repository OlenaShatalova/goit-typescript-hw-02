import { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';
import { IData, IImageData, IPage } from './App.types';
import { getPhotos } from '../../apiService/photos';

const App: React.FC<{}> = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [photos, setPhotos] = useState<IImageData[]>([]);
  const [error, setError] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<IPage>({
    currentPage: 1,
    totalPages: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImageData | null>(null);

  const onSubmit = (query: string): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage({ currentPage: 1, totalPages: 0 });
    setQuery(query);
    setError(null);
  };

  const onLoadMore: () => void = () => {
    setPage(prevPage => ({
      ...prevPage,
      currentPage: prevPage.currentPage + 1,
    }));
  };

  const openModal = (imageData: IImageData): void => {
    if (!modalIsOpen || selectedImage !== imageData) {
      setModalIsOpen(true);
      setSelectedImage(imageData);
    }
  };

  const onClose: () => void = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect((): void => {
    if (!query) return;

    const getData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const data: IData = await getPhotos(query, page.currentPage);
        console.log(data);

        setPage(prevPage => ({
          ...prevPage,
          totalPages: data.total_pages,
        }));

        setPhotos(prevPhotos =>
          page.currentPage === 1
            ? data.results
            : [...prevPhotos, ...data.results]
        );
      } catch (error) {
        console.log(error, 'catch');

        if (error instanceof Error) {
          console.log(error);
          setError(true);
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page.currentPage, query]);

  useEffect(() => {
    if (page.currentPage > 1) {
      const scrollValue = window.innerHeight / 1.5;
      window.scrollBy({
        top: scrollValue,
        behavior: 'smooth',
      });
    }
  }, [photos]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {query && <ImageGallery photos={photos} isOpen={openModal} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={errorMessage} />}
      {page.totalPages > page.currentPage && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}

      {modalIsOpen && selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={onClose}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
};

export default App;
