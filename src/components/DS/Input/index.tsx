import { forwardRef } from 'react';
import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className={styles.input} ref={ref} {...props} />;
});

export default Input;
