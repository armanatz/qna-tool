import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changeQnAStatus,
  addQnA,
  editQnA,
  getQnAsStatus,
  QnA,
} from '../../redux/reducers/qnas.slice';

import { FormControl, Input, TextArea, Checkbox, Button } from '../DS';
import { Circular } from '../DS/Loaders';

type QnAFormProps = {
  edit?: boolean;
  id?: string;
  values?: QnA;
  onSuccess?: () => void;
};

interface QnAFormData extends QnA {
  delay: boolean;
}

const qnaFormSchema = z.object({
  question: z
    .string()
    .min(10, { message: 'Question must be at least 10 characters long' }),
  answer: z
    .string()
    .min(10, { message: 'Answer must be at least 10 characters long' }),
  delay: z.boolean().optional(),
});

export default function QnAForm({
  edit = false,
  id = undefined,
  values = undefined,
  onSuccess = undefined,
}: QnAFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QnAFormData>({
    resolver: zodResolver(qnaFormSchema),
    ...(values && {
      defaultValues: {
        question: values.question,
        answer: values.answer,
      },
    }),
  });

  const qnasStatus = useAppSelector(getQnAsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (onSuccess && qnasStatus === 'success') {
      dispatch(changeQnAStatus('idle'));
      onSuccess();
    }
  }, [qnasStatus, onSuccess, dispatch]);

  const onSubmit = (data: QnAFormData) => {
    if (edit && id) {
      return dispatch(
        editQnA({
          ...data,
          id,
          question: data.question.trim(),
        }),
      );
    }
    return dispatch(
      addQnA({
        ...data,
        question: data.question.trim(),
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="Question"
        labelProps={{ htmlFor: 'question' }}
        hasError={errors.question !== undefined}
        errorMessage={errors.question?.message}
      >
        <Input
          placeholder="Type out a question..."
          autoComplete="off"
          id="question"
          {...register('question')}
        />
      </FormControl>
      <FormControl
        label="Answer"
        labelProps={{ htmlFor: 'answer' }}
        hasError={errors.answer !== undefined}
        errorMessage={errors.answer?.message}
      >
        <TextArea
          rows={5}
          placeholder="Type out an answer for the question above..."
          id="answer"
          {...register('answer')}
        />
      </FormControl>
      {!edit ? (
        <FormControl>
          <Checkbox
            label="Delay adding question by 5 secs"
            {...register('delay')}
          />
        </FormControl>
      ) : null}
      <Button
        type="submit"
        variant="success"
        disabled={qnasStatus === 'loading'}
        title="Saves the question and answer"
      >
        {qnasStatus === 'loading' ? (
          <Circular size={16} color="#f5f5f5" />
        ) : null}
        <span>{qnasStatus === 'loading' ? 'Adding Question...' : 'Save'}</span>
      </Button>
    </form>
  );
}
