import { forwardRef } from 'react';
import styles from './TextArea.module.scss';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return <textarea ref={ref} className={styles.input} {...props} />;
  },
);

export default TextArea;
