import { ClimbingBox } from '../DS/Loaders';

import styles from './FullPageLoader.module.scss';

export default function FullPageLoader() {
  return (
    <div className={styles.container}>
      <ClimbingBox />
    </div>
  );
}
