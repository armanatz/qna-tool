import { useState } from 'react';
import { IconPlus, IconSortAZ, IconTrashX } from '@tabler/icons';

import { useAppDispatch } from '../../../hooks';

import { deleteAllQnAs, sortQnAs } from '../../../redux/reducers/qnas.slice';

import { Button, Modal, Tooltip } from '../../DS';
import QnAForm from '../../Forms/QnAForm';

import styles from './ActionBtns.module.scss';

type ActionBtnsProps = {
  showSortBtn?: boolean;
  showDeleteBtn?: boolean;
};

export default function ActionBtns({
  showSortBtn = false,
  showDeleteBtn = false,
}: ActionBtnsProps) {
  const dispatch = useAppDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);

  return (
    <div className={styles['action-btns']}>
      <Modal
        title="Add a Question"
        isOpen={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      >
        <QnAForm onSuccess={() => setAddModalVisible(false)} />
      </Modal>
      {/* Very French. Oui oui!! */}
      <Tooltip title="Click this button to create new questions and answers">
        <Button
          onClick={() => setAddModalVisible(true)}
          title={'Opens the "Add a Question" form'}
        >
          <IconPlus size={16} />
        </Button>
      </Tooltip>
      {showSortBtn ? (
        <Tooltip title="Sort questions alphabetically">
          <Button
            onClick={() => dispatch(sortQnAs())}
            variant="secondary"
            title="Alphabetically sorts the question cards below"
          >
            <IconSortAZ size={16} />
          </Button>
        </Tooltip>
      ) : null}
      {showDeleteBtn ? (
        <Tooltip title="Delete all questions and answers below">
          <Button
            onClick={() => dispatch(deleteAllQnAs())}
            variant="danger"
            title="Deletes all the question cards below"
          >
            <IconTrashX size={16} />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  );
}
