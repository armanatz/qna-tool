import { useMemo } from 'react';
import { IconInfoCircle } from '@tabler/icons';

import { useAppSelector } from '../../hooks';

import { selectAllQnAs } from '../../redux/reducers/qnas.slice';

import { Tooltip } from '../../components/DS';
import QnACard from '../../components/Home/QnACard';
import EmptyContent from '../../components/EmptyContent';

import styles from './Home.module.scss';
import ActionBtns from '../../components/Home/ActionBtns';

export default function Home() {
  const qnas = useAppSelector(selectAllQnAs);

  const cards = useMemo(
    () =>
      Object.entries(qnas).map(([id, record]) => (
        <QnACard key={id} id={id} data={record} />
      )),
    [qnas],
  );

  return (
    <div>
      <div className={styles.heading}>
        <div>
          <div className={styles['title-container']}>
            <h1 className={styles.title}>Your Questions</h1>
            <Tooltip
              title="Here you can find your created questions and their answers"
              position="right"
            >
              <IconInfoCircle size={16} />
            </Tooltip>
          </div>
          {cards.length > 0 ? (
            <p>
              Here you can find the {cards.length} questions you have created.
              Feel free to create some more.
            </p>
          ) : (
            <p>
              There are no questions currently. Get started by creating some
              amazing ones!
            </p>
          )}
        </div>
        <ActionBtns
          showSortBtn={cards.length > 0}
          showDeleteBtn={cards.length > 0}
        />
      </div>
      {cards.length > 0 ? (
        <div className={styles['grid-container']}>
          <div className={styles.grid}>{cards}</div>
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyContent text="No Questions :(" />
        </div>
      )}
    </div>
  );
}
