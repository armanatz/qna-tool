import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { IconX } from '@tabler/icons';

import Button from '../Button';

import styles from './Modal.module.scss';

interface ModalProps extends React.PropsWithChildren {
  title?: string | React.ReactElement | React.ReactElement[];
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({
  children,
  isOpen = false,
  onClose = undefined,
  title = 'Modal Title',
}: ModalProps) {
  const portalNode = useRef<HTMLDivElement | HTMLElement | null>(null);

  useEffect(() => {
    const portalId = Date.now().toString();

    if (isOpen && portalNode.current) {
      portalNode.current.classList.add(styles.portal);
      portalNode.current.setAttribute('id', portalId);
      document.body.appendChild(portalNode.current);
    }

    const el = portalNode.current;

    return () => {
      if (el) {
        el.remove();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscToClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };

    if (window) window.addEventListener('keydown', handleEscToClose);

    return () => window.removeEventListener('keydown', handleEscToClose);
  }, [onClose]);

  if (!portalNode.current) {
    portalNode.current = document.createElement('div');
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        role="presentation"
        className={styles.overlay}
        onClick={onClose}
        data-testid="modalOverlay"
      />
      <div
        role="dialog"
        className={styles.main}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Escape' && onClose) onClose();
          return false;
        }}
      >
        <div className={styles.header}>
          <div className={styles.title}>
            {typeof title === 'string' ? <h3>{title}</h3> : title}
          </div>
          <Button
            title={`Close ${title} Dialog`}
            onClick={onClose}
            variant="ghost"
          >
            <IconX size={16} />
          </Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    portalNode.current,
  );
}
