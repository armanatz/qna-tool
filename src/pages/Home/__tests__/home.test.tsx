import { describe, it, expect } from 'vitest';
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

describe('ui state', () => {
  it('should initially render questions when initial state has data', () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const revealAnswerBtnEls = screen.getAllByTitle('Reveals the answer');

    expect(revealAnswerBtnEls.length).toBe(2);
  });

  it('should show correct questions count in the sub heading when initial state has data', async () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const subHeadingEl = screen.getByText(/here you can find/i);

    expect(subHeadingEl).toBeInTheDocument();
    expect(subHeadingEl.textContent).toContain(
      Object.keys(mockQnAData.data).length.toString(),
    );
  });

  it('should show empty content when initial state has no data', async () => {
    renderWithProvider(<Home />, {
      preloadedState: { qnas: { data: {}, status: 'idle' } },
    });

    const noQuestionsTextEl = screen.getByText('No Questions :(');

    expect(noQuestionsTextEl).toBeInTheDocument();
  });

  it('should show all action buttons when initial state has data', () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    const sortQuestionsBtnEl = screen.getByTitle(
      'Alphabetically sorts the question cards below',
    );

    const deleteAllQuestionsBtn = screen.getByTitle(
      'Deletes all the question cards below',
    );

    expect(addQuestionBtnEl).toBeInTheDocument();
    expect(sortQuestionsBtnEl).toBeInTheDocument();
    expect(deleteAllQuestionsBtn).toBeInTheDocument();
  });

  it('should show only the add question action button when initial state has no data', () => {
    renderWithProvider(<Home />, {
      preloadedState: { qnas: { data: {}, status: 'idle' } },
    });

    const addQuestionBtnEl = screen.getByTitle(
      'Opens the "Add a Question" form',
    );

    const sortQuestionsBtnEl = screen.queryByTitle(
      'Alphabetically sorts the question cards below',
    );

    const deleteAllQuestionsBtn = screen.queryByTitle(
      'Deletes all the question cards below',
    );

    expect(addQuestionBtnEl).toBeInTheDocument();
    expect(sortQuestionsBtnEl).not.toBeInTheDocument();
    expect(deleteAllQuestionsBtn).not.toBeInTheDocument();
  });
});

describe('dynamic sub heading', () => {
  it('should dynamically change questions count in sub heading', async () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const subHeadingEl = screen.getByText(/here you can find/i);

    expect(subHeadingEl).toBeInTheDocument();
    expect(subHeadingEl.textContent).toContain(
      Object.keys(mockQnAData.data).length.toString(),
    );

    const user = userEvent.setup();

    const deleteQuestionBtnEls = screen.getAllByTitle('Deletes this question');

    await user.click(deleteQuestionBtnEls[0]);

    expect(subHeadingEl.textContent).toContain(
      (Object.keys(mockQnAData.data).length - 1).toString(),
    );
  });

  it('should change the sub heading when there are no questions on screen', async () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const subHeadingEl = screen.getByText(/here you can find/i);

    expect(subHeadingEl).toBeInTheDocument();

    const user = userEvent.setup();

    const deleteQuestionBtnEl = screen.getByTitle(
      'Deletes all the question cards below',
    );

    await user.click(deleteQuestionBtnEl);

    expect(subHeadingEl.textContent).toContain('There are no');
    expect(subHeadingEl.textContent).not.toContain('Here you can find');
  });
});

describe('question cards', () => {
  it('should show answer when reveal button clicked', async () => {
    renderWithProvider(<Home />, { preloadedState: { qnas: mockQnAData } });

    const user = userEvent.setup();
    const revealAnswerBtnEls = screen.getAllByTitle('Reveals the answer');

    await user.click(revealAnswerBtnEls[0]);

    const answerTextEl = screen.getByText(mockQnAData.data.a.answer);

    expect(answerTextEl).toBeInTheDocument();
  });
});
