import { describe, it, expect, vitest } from 'vitest';
import { screen, render } from '@testing-library/react';

import Modal from '../index';

const handleOnClose = vitest.fn();

let MockModal: () => React.ReactElement;

beforeAll(() => {
  MockModal = () => (
    <Modal isOpen onClose={handleOnClose}>
      <p>Test</p>
    </Modal>
  );
});

describe('open behavior', () => {
  it('should open modal when button clicked', async () => {
    render(<MockModal />);

    const modalEl = screen.getByRole('dialog');
    const modalHeadingEl = screen.getByText('Modal Title');

    expect(modalEl).toBeInTheDocument();
    expect(modalHeadingEl.textContent).toEqual('Modal Title');
  });
});
