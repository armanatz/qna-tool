import { describe, it, expect, vitest } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('close behavior', () => {
  it('should close modal when close button clicked', async () => {
    render(<MockModal />);

    const user = userEvent.setup();
    const closeBtnEl = screen.getByTitle('Close Modal Title Dialog');

    await user.click(closeBtnEl);

    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when overlay clicked', async () => {
    render(<MockModal />);

    const user = userEvent.setup();
    const overlayEl = screen.getByTestId('modalOverlay');

    await user.click(overlayEl);

    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when escape key pressed', async () => {
    render(<MockModal />);

    const user = userEvent.setup();

    await user.keyboard('[Escape]');

    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });
});
