import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '../../../utils/testUtils';

import Home from '../index';

describe('add question modal rendering', () => {
  it('should contain question input field', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    await user.click(addQuestionBtnEl);

    const inputEl = screen.getByLabelText('Question');

    expect(inputEl).toBeInTheDocument();
  });

  it('should contain answer textarea field', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    await user.click(addQuestionBtnEl);

    const textAreaEl = screen.getByLabelText('Answer');

    expect(textAreaEl).toBeInTheDocument();
  });

  it('should contain delay checkbox', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    await user.click(addQuestionBtnEl);

    const checkboxEl = screen.getByLabelText('Delay adding question by 5 secs');

    expect(checkboxEl).toBeInTheDocument();
  });

  it('should contain submit button', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    await user.click(addQuestionBtnEl);

    const submitBtnEl = screen.getByTitle('Saves the question and answer');

    expect(submitBtnEl).toBeInTheDocument();
  });
});

describe('add question user events', () => {
  it('should add question immediately when delay is false', async () => {
    renderWithProvider(<Home />);

    const user = userEvent.setup();

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    await user.click(addQuestionBtnEl);

    const inputEl = screen.getByLabelText('Question');
    const textAreaEl = screen.getByLabelText('Answer');
    const submitBtnEl = screen.getByTitle('Saves the question and answer');

    const questionText = 'Is this a test question?';
    const answerText = 'In fact, it is!';

    await user.type(inputEl, questionText);
    await user.type(textAreaEl, answerText);
    await user.click(submitBtnEl);

    const questionTextEl = screen.getByText(questionText);
    expect(questionTextEl).toBeInTheDocument();

    const revealAnswerBtnEls = screen.getAllByTitle('Reveals the answer');

    await user.click(revealAnswerBtnEls[revealAnswerBtnEls.length - 1]);

    const answerTextEl = screen.getByText(answerText);
    expect(answerTextEl).toBeInTheDocument();
  });

  it(
    'should wait 5 seconds to add question when delay is true',
    async () => {
      renderWithProvider(<Home />);

      const user = userEvent.setup();

      const addQuestionBtnEl = screen.getByTitle(
        'Opens the "Add a Question" form',
      );

      await user.click(addQuestionBtnEl);

      const inputEl = screen.getByLabelText('Question');
      const textAreaEl = screen.getByLabelText('Answer');
      const submitBtnEl = screen.getByTitle('Saves the question and answer');
      const checkboxEl = screen.getByLabelText(
        'Delay adding question by 5 secs',
      );

      const questionText = 'Is this a test question?';
      const answerText = 'In fact, it is!';

      await user.type(inputEl, questionText);
      await user.type(textAreaEl, answerText);
      await user.click(checkboxEl);
      await user.click(submitBtnEl);

      await waitFor(
        async () => {
          expect(screen.getByText(questionText)).toBeInTheDocument();

          const revealAnswerBtnEls = screen.getAllByTitle('Reveals the answer');

          await user.click(revealAnswerBtnEls[revealAnswerBtnEls.length - 1]);

          const answerTextEl = screen.getByText(answerText);
          expect(answerTextEl).toBeInTheDocument();
        },
        { timeout: 6000 },
      );
    },
    { timeout: 6000 },
  );
});
