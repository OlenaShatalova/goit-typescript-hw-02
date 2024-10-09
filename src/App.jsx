import ErrorMessage from './copmonents/ErrorMessage/ErrorMessage';
import ImageGallery from './copmonents/ImageGallery/ImageGallery';
import ImageModal from './copmonents/ImageModal/ImageModal';
import Loader from './copmonents/Loader/Loader';
import LoadMoreBtn from './copmonents/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './copmonents/SearchBar/SearchBar';

import { useState, useEffect } from 'react';
import { getPhotos } from './apiService/photos';

const App = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState({ currentPage: 1 });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    urls: {
      regular: '',
    },
  });

  const onSubmit = query => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage({ currentPage: 1 });
    setQuery(query);
    setError(null);
  };

  const onLoadMore = () => {
    setPage({ ...page, currentPage: page.currentPage + 1 });
  };

  const isOpen = imageData => {
    const { urls, alt_description, likes } = imageData;
    setModalIsOpen(true);
    setSelectedImage({
      urls,
      alt_description,
      likes,
    });
  };

  const onClose = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(query, page.currentPage);
        setPage({ ...page, totalPages: data.total_pages });
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

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {query && <ImageGallery photos={photos} isOpen={isOpen} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {page.totalPages > page.currentPage && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onClose={onClose}
        selectedImage={selectedImage}
      />
    </>
  );
};

export default App;
