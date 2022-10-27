import { forwardRef, useRef } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, ...rest }, ref) => {
    const { current: checkboxId } = useRef(id || `checkbox_${Date.now()}`);

    return (
      <div className={styles.checkbox}>
        <input type="checkbox" ref={ref} {...rest} id={checkboxId} />
        {label ? <label htmlFor={checkboxId}>{label}</label> : null}
      </div>
    );
  },
);

Checkbox.defaultProps = {
  id: undefined,
  label: undefined,
};

export default Checkbox;
