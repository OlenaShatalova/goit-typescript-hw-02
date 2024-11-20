import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';

import { useState, useEffect } from 'react';
import { getPhotos } from '../../apiService/photos';
import { IimageData } from './App.types';

const App: React.FC<{}> = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [photos, setPhotos] = useState<object[]>([]);
  const [error, setError] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<{ currentPage: number }>({ currentPage: 1 });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IimageData | null>(null);

  const onSubmit = (query: string): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage({ currentPage: 1 });
    setQuery(query);
    setError(null);
  };

  const onLoadMore: () => void = () => {
    setPage(prevPage => ({
      ...prevPage,
      currentPage: prevPage.currentPage + 1,
    }));
  };

  const isOpen = (imageData: IimageData) => {
    setModalIsOpen(true);
    setSelectedImage(imageData);
  };

  const onClose: () => void = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(query, page.currentPage);
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
        setError(error.message);
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
      {query && <ImageGallery photos={photos} isOpen={isOpen} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {page.totalPages > page.currentPage && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}

      {modalIsOpen && selectedImage !== null && (
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
