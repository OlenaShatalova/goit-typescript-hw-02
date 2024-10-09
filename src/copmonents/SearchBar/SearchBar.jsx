import toast, { Toaster } from 'react-hot-toast';
import { PiMagnifyingGlass } from 'react-icons/pi';
import css from './SearchBar.module.css';

const toastStyle = {
  padding: 15,
  border: '1px solid black',
  borderRadius: 5,
  background: 'white',
};

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.search.value.trim();

    value
      ? onSubmit(value)
      : toast.custom(
          <div style={toastStyle}>
            You need to enter the text to find images
          </div>
        );
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          <PiMagnifyingGlass size="24px" color="grey" />
        </button>
      </form>
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
    </header>
  );
};

export default SearchBar;
