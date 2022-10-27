import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../store';

export type QnA = {
  question: string;
  answer: string;
};

interface NewQnAPayload extends QnA {
  delay: boolean;
}

interface EditQnAPayload extends QnA {
  id: string;
}

type QnARecord = Record<string, QnA>;

type QnAStatus = 'idle' | 'loading' | 'success' | 'error';

export type QnAState = {
  data: QnARecord;
  status: QnAStatus;
};

const initialState: QnAState = {
  data: {
    [nanoid()]: {
      question: 'What is JavaScript?',
      answer:
        'JavaScript is a very powerful client-side scripting language. JavaScript is used mainly for enhancing the interaction of a user with the webpage. In other words, you can make your webpage more lively and interactive, with the help of JavaScript. JavaScript is also being used widely in game development and Mobile application development.',
    },
    [nanoid()]: {
      question: 'Enumerate the differences between Java and JavaScript?',
      answer:
        'Java is a complete programming language. In contrast, JavaScript is a coded program that can be introduced to HTML pages. These two languages are not at all inter-dependent and are designed for different intent. Java is an object-oriented programming (OOPS) or structured programming languages like C++ or C, whereas JavaScript is a client-side scripting language.',
    },
  },
  status: 'idle',
};

export const addQnA = createAsyncThunk(
  'qnas/addQnA',
  (qna: NewQnAPayload): Promise<NewQnAPayload> => {
    return new Promise(resolve => {
      if (qna.delay === true) setTimeout(resolve, 5000, qna);
      else resolve(qna);
    });
  },
);

const qnasSlice = createSlice({
  name: 'qnas',
  initialState,
  reducers: {
    changeQnAStatus: (state, action: PayloadAction<QnAStatus>) => {
      const status = action.payload;
      state.status = status;
    },
    editQnA: (state, action: PayloadAction<EditQnAPayload>) => {
      const { id, question, answer } = action.payload;
      state.data[id] = { question, answer };
      state.status = 'success';
    },
    deleteQnA: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const newData = { ...state.data };
      delete newData[id];
      state.data = newData;
    },
    deleteAllQnAs: state => {
      state.data = {};
    },
    sortQnAs: state => {
      const sortedData = Object.entries(state.data)
        .sort((a, b) => a[1].question.localeCompare(b[1].question))
        .reduce(
          (prev, [id, data]) => ({
            ...prev,
            [id]: data,
          }),
          {},
        );
      state.data = sortedData;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addQnA.pending, state => {
        state.status = 'loading';
      })
      .addCase(addQnA.fulfilled, (state, action) => {
        const { question, answer } = action.payload;
        const id = nanoid();
        state.data[id] = { question, answer };
        state.status = 'success';
      })
      .addCase(addQnA.rejected, state => {
        state.status = 'error';
      });
  },
});

export const selectAllQnAs = (state: RootState) => state.qnas.data;
export const getQnAsStatus = (state: RootState) => state.qnas.status;

export const { changeQnAStatus, editQnA, deleteQnA, deleteAllQnAs, sortQnAs } =
  qnasSlice.actions;

export default qnasSlice.reducer;
