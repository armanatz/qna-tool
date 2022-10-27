import { IconFileOff } from '@tabler/icons';

import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
  text?: string;
};

export default function EmptyContent({ text = 'No Data' }: EmptyContentProps) {
  return (
    <div className={styles.container}>
      <IconFileOff size={32} />
      <p>{text}</p>
    </div>
  );
}
