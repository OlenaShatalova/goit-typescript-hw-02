import css from './ErrorMessage.module.css';
import { ErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <div>{error}</div>;
};

export default ErrorMessage;
