import { LoadMoreProps } from './LoadMoreBtn.types';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn: React.FC<LoadMoreProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={css.load_btn}
    >
      LoadMore
    </button>
  );
};

export default LoadMoreBtn;
