import { Grid } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#286FF0"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass={css.grid_wrapper}
      />
    </div>
  );
};

export default Loader;
