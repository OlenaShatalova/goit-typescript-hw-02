import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.load_btn}>
      LoadMore
    </button>
  );
};

export default LoadMoreBtn;
