import { ErrorMessageProps } from './ErrorMessage.types';
// import css from './ErrorMessage.module.css';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
}) => {
  return <div>{error}</div>;
};

export default ErrorMessage;
