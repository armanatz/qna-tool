import classNames from 'classnames';
import styles from './FormControl.module.scss';

type FormControlProps = {
  children: React.ReactElement;
  inline?: boolean;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
};

export default function FormControl({
  children,
  inline = false,
  label = undefined,
  labelProps = undefined,
  className = undefined,
  hasError = false,
  errorMessage = undefined,
}: FormControlProps) {
  return (
    <div
      className={classNames(styles['form-control'], {
        [`${styles.inline}`]: inline,
        [`${className}`]: className,
      })}
    >
      {label ? <label {...labelProps}>{label}</label> : null}
      {children}
      {hasError ? <p className={styles.error}>{errorMessage}</p> : null}
    </div>
  );
}
