import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '../../../utils/testUtils';

import Home from '../index';

import type { QnAState } from '../../../redux/reducers/qnas.slice';

let mockQnAData: QnAState;

beforeAll(() => {
  mockQnAData = {
    data: {
      a: { question: 'Test Question 2', answer: 'Test Answer 2' },
      b: { question: 'Test Question 1', answer: 'Test Answer 1' },
      c: { question: 'Test Question 3', answer: 'Test Answer 3' },
    },
    status: 'idle',
  };
});

it('should sort questions alphabetically when sort button clicked', async () => {
  renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

  const user = userEvent.setup();
  const sortQuestionsBtnEl = screen.getByTitle(
    'Alphabetically sorts the question cards below',
  );

  await user.click(sortQuestionsBtnEl);

  const questionCards = screen.getAllByText('Question:');

  for (let i = 0; i < questionCards.length; i += 1) {
    expect(questionCards[i].nextSibling?.firstChild?.textContent).toEqual(
      `Test Question ${i + 1}`,
    );
  }
});
