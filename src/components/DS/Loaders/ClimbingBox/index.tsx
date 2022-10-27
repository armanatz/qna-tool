import { useEffect } from 'react';
import styles from './ClimbingBox.module.scss';

interface ClimbingBoxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  color?: string;
  speedMultiplier?: number;
  size?: number | string;
}

export default function ClimbingBox({
  color = '#333333',
  speedMultiplier = 1,
  size = 15,
  ...additionalprops
}: ClimbingBoxProps) {
  useEffect(() => {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);

    const keyFrames = `
      @keyframes spinner-climbing-box {
        0% {transform:translate(0, -1em) rotate(-45deg)}
        5% {transform:translate(0, -1em) rotate(-50deg)}
        20% {transform:translate(1em, -2em) rotate(47deg)}
        25% {transform:translate(1em, -2em) rotate(45deg)}
        30% {transform:translate(1em, -2em) rotate(40deg)}
        45% {transform:translate(2em, -3em) rotate(137deg)}
        50% {transform:translate(2em, -3em) rotate(135deg)}
        55% {transform:translate(2em, -3em) rotate(130deg)}
        70% {transform:translate(3em, -4em) rotate(217deg)}
        75% {transform:translate(3em, -4em) rotate(220deg)}
        100% {transform:translate(0, -1em) rotate(-225deg)}
      }
    `;

    styleEl.innerHTML = keyFrames;

    return () => styleEl.remove();
  }, []);

  return (
    <span className={styles.container} {...additionalprops}>
      <span
        className={styles.wrapper}
        style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
      >
        <span
          className={styles.box}
          style={{
            animation: `spinner-climbing-box ${
              2.5 / speedMultiplier
            }s infinite cubic-bezier(0.79, 0, 0.47, 0.97)`,
            border: `0.25em solid ${color}`,
          }}
        />
        <span
          className={styles.hill}
          style={{ borderLeft: `0.25em solid ${color}` }}
        />
      </span>
    </span>
  );
}
