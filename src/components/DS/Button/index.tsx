import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'link';
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  className = undefined,
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(styles.btn, styles[variant], className)}
      {...rest}
    >
      <div className={styles.inner}>{children}</div>
    </button>
  );
}
