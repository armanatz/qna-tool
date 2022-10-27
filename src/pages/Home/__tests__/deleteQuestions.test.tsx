import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '../../../utils/testUtils';

import Home from '../index';

import type { QnAState } from '../../../redux/reducers/qnas.slice';

let mockQnAData: QnAState;

beforeEach(() => {
  mockQnAData = {
    data: {
      a: { question: 'Test Question 1', answer: 'Test Answer 1' },
      b: { question: 'Test Question 2', answer: 'Test Answer 2' },
    },
    status: 'idle',
  };
});

it('should delete all questions when delete all question button clicked', async () => {
  renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

  const user = userEvent.setup();
  const deleteAllQuestionsBtn = screen.getByTitle(
    'Deletes all the question cards below',
  );

  await user.click(deleteAllQuestionsBtn);

  const questions = screen.queryAllByText('Question:');

  expect(questions.length).toBe(0);
});

it('should delete a question when its delete button is clicked', async () => {
  renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

  const user = userEvent.setup();
  const deleteQuestionBtnEls = screen.getAllByTitle('Deletes this question');

  await user.click(deleteQuestionBtnEls[0]);

  const questions = screen.queryAllByText('Question:');

  expect(questions.length).toBe(1);
});
