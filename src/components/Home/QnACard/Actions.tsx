import { IconEdit, IconTrash } from '@tabler/icons';
import { Button } from '../../DS';

import styles from './QnACard.module.scss';

type QnACardActionsProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export default function QnACardActions({
  onEditClick = undefined,
  onDeleteClick = undefined,
}: QnACardActionsProps) {
  return (
    <div className={styles.actions}>
      <Button
        variant="link"
        onClick={onEditClick}
        title={'Opens the "Edit Question" form'}
      >
        <IconEdit size={16} className={styles.edit} />
      </Button>
      <Button
        variant="link"
        onClick={onDeleteClick}
        title="Deletes this question"
      >
        <IconTrash size={16} className={styles.delete} />
      </Button>
    </div>
  );
}
