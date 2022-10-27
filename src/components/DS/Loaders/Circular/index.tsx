import { useEffect } from 'react';

import styles from './Circular.module.scss';

interface CircularProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  color?: string;
  speedMultiplier?: number;
  size?: number | string;
}

export default function Circular({
  color = '#333333',
  speedMultiplier = 1,
  size = 35,
  ...additionalprops
}: CircularProps) {
  useEffect(() => {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);

    const keyFrames = `
      @keyframes loader-circular {
        0% {transform: rotate(0deg) scale(1)}
        50% {transform: rotate(180deg) scale(0.8)}
        100% {transform: rotate(360deg) scale(1)}
      }
    `;

    styleEl.innerHTML = keyFrames;

    return () => styleEl.remove();
  }, []);

  return (
    <span
      className={styles.loader}
      style={{
        animation: `loader-circular ${
          0.75 / speedMultiplier
        }s 0s infinite linear`,
        borderTopColor: color,
        borderLeftColor: color,
        borderRightColor: color,
        height: size,
        width: size,
      }}
      {...additionalprops}
    />
  );
}
