import { Link } from 'react-router-dom';

import Travolta from '../../assets/confused_travolta.gif';

import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page Not Found</h1>
      <img
        src={Travolta}
        alt="Confused John Travolta"
        className={styles.travolta}
      />
      <p className={styles.text}>
        You stumbled somewhere unknown and we couldn&apos;t figure out where you
        were going :/
      </p>
      <Link to="/" className={styles.text}>
        Let&apos;s take you back somewhere safe, shall we?
      </Link>
    </div>
  );
}
