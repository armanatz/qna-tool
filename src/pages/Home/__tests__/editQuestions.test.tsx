import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '../../../utils/testUtils';

import Home from '../index';

import type { QnAState } from '../../../redux/reducers/qnas.slice';

let mockQnAData: QnAState;

beforeAll(() => {
  mockQnAData = {
    data: {
      a: { question: 'Test Question 1', answer: 'Test Answer 1' },
      b: { question: 'Test Question 2', answer: 'Test Answer 2' },
    },
    status: 'idle',
  };
});

describe('edit question modal rendering', () => {
  it('should not contain delay checkbox', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const editQuestionBtnEls = screen.getAllByTitle(
      'Opens the "Edit Question" form',
    );

    await user.click(editQuestionBtnEls[0]);

    const checkboxEl = screen.queryByLabelText(
      'Delay adding question by 5 secs',
    );

    expect(checkboxEl).not.toBeInTheDocument();
  });

  it('should contain submit button', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const editQuestionBtnEls = screen.getAllByTitle(
      'Opens the "Edit Question" form',
    );

    await user.click(editQuestionBtnEls[0]);

    const submitBtnEl = screen.getByTitle('Saves the question and answer');

    expect(submitBtnEl).toBeInTheDocument();
  });

  describe('question input field', () => {
    it('should be rendered', async () => {
      renderWithProvider(<Home />);

      const user = userEvent.setup();

      const editQuestionBtnEls = screen.getAllByTitle(
        'Opens the "Edit Question" form',
      );

      await user.click(editQuestionBtnEls[0]);

      const inputEl = screen.getByLabelText('Question');

      expect(inputEl).toBeInTheDocument();
    });

    it('should contain question text', async () => {
      renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

      const user = userEvent.setup();

      const editQuestionBtnEls = screen.getAllByTitle(
        'Opens the "Edit Question" form',
      );

      await user.click(editQuestionBtnEls[0]);

      const inputEl: HTMLInputElement = screen.getByLabelText('Question');

      expect(inputEl.value).toEqual(mockQnAData.data.a.question);
    });
  });

  describe('answer textarea field', () => {
    it('should be rendered', async () => {
      renderWithProvider(<Home />);

      const user = userEvent.setup();

      const editQuestionBtnEls = screen.getAllByTitle(
        'Opens the "Edit Question" form',
      );

      await user.click(editQuestionBtnEls[0]);

      const textAreaEl = screen.getByLabelText('Answer');

      expect(textAreaEl).toBeInTheDocument();
    });

    it('should contain answer text', async () => {
      renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

      const user = userEvent.setup();

      const editQuestionBtnEls = screen.getAllByTitle(
        'Opens the "Edit Question" form',
      );

      await user.click(editQuestionBtnEls[0]);

      const textAreaEl: HTMLTextAreaElement = screen.getByLabelText('Answer');

      expect(textAreaEl.value).toEqual(mockQnAData.data.a.answer);
    });
  });
});

describe('edit question user events', () => {
  it('should edit question', async () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const user = userEvent.setup();

    const editQuestionBtnEls = screen.getAllByTitle(
      'Opens the "Edit Question" form',
    );

    await user.click(editQuestionBtnEls[0]);

    const inputEl = screen.getByLabelText('Question');
    const textAreaEl = screen.getByLabelText('Answer');
    const submitBtnEl = screen.getByTitle('Saves the question and answer');
    const questionText = 'Test Question A';
    const answerText = 'Test Answer A';

    await user.clear(inputEl);
    await user.type(inputEl, questionText);
    await user.clear(textAreaEl);
    await user.type(textAreaEl, answerText);
    await user.click(submitBtnEl);

    const questionTextEl = screen.getByText(questionText);
    expect(questionTextEl).toBeInTheDocument();

    const revealAnswerBtnEls = screen.getAllByTitle('Reveals the answer');

    await user.click(revealAnswerBtnEls[0]);

    const answerTextEl = screen.getByText(answerText);
    expect(answerTextEl).toBeInTheDocument();
  });
});
