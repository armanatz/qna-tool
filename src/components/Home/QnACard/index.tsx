import { useEffect, useState } from 'react';
import classNames from 'classnames';

import QnACardActions from './Actions';
import { Button, Modal } from '../../DS';
import QnAForm from '../../Forms/QnAForm';

import { useAppDispatch } from '../../../hooks';

import { deleteQnA, QnA } from '../../../redux/reducers/qnas.slice';

import styles from './QnACard.module.scss';

type QnACardProps = {
  id: string;
  data: QnA;
};

export default function QnACard({ id, data }: QnACardProps) {
  const [flip, setFlip] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (flip === false) {
      const timeout = setTimeout(() => setShowAnswer(false), 250);
      return () => clearTimeout(timeout);
    }

    setShowAnswer(true);
    return () => false;
  }, [flip, setShowAnswer]);

  return (
    <>
      <Modal
        title="Edit Question"
        isOpen={editModalVisible}
        onClose={() => setEditModalVisible(false)}
      >
        <QnAForm
          edit
          id={id}
          values={data}
          onSuccess={() => setEditModalVisible(false)}
        />
      </Modal>
      <div className={styles.main}>
        <div className={classNames(styles.inner, { [styles.flip]: flip })}>
          <div
            className={classNames(styles['content-container'], styles.front)}
          >
            <QnACardActions
              onEditClick={() => setEditModalVisible(true)}
              onDeleteClick={() => dispatch(deleteQnA(id))}
            />
            <div className={styles.text}>
              <h3>Question:</h3>
              <div className={styles.overflow}>
                <p>{data.question}</p>
              </div>
            </div>
            <Button
              variant="link"
              onClick={() => setFlip(true)}
              title="Reveals the answer"
            >
              Reveal Answer
            </Button>
          </div>
          <div className={classNames(styles['content-container'], styles.back)}>
            <div className={styles.text}>
              <h3>Answer:</h3>
              <div className={styles.overflow}>
                {showAnswer ? <p>{data.answer}</p> : null}
              </div>
            </div>
            <Button
              variant="link"
              onClick={() => setFlip(false)}
              title="Hides the answer"
            >
              Hide Answer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
