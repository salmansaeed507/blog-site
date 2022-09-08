import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Loading } from './Loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const POST_REPLY = gql`
  mutation PostReply($commentId: String!, $postReplyInput: PostReplyInput!) {
    postReply(commentId: $commentId, postReplyInput: $postReplyInput) {
      id
      comment
      user {
        email
      }
    }
  }
`;

interface IFormValues {
  isOpen: boolean;
  comment: string;
}

const schema = yup
  .object({
    comment: yup.string().required(),
  })
  .required();

export function PostReply(props: {
  commentId: string;
  onPostReply?: Function;
}) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const watchIsOpen = watch('isOpen', false);

  const [postReply, { loading, error, called }] = useMutation(POST_REPLY, {
    onCompleted(data) {
      props.onPostReply && props.onPostReply(data.postReply);
      reset();
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    postReply({
      variables: {
        commentId: props.commentId,
        postReplyInput: {
          comment: data.comment,
        },
      },
    });
  };

  if (called && loading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!watchIsOpen ? (
        <Button
          variant="link"
          size="sm"
          onClick={(e) => setValue('isOpen', !watchIsOpen)}
        >
          Reply
        </Button>
      ) : (
        <div>
          <p>
            <textarea
              autoFocus
              className="form-control"
              {...register('comment')}
            />
          </p>
          {errors.comment && <p className="error">{errors.comment.message}</p>}
          <p>
            <Button variant="primary" size="sm" type="submit">
              Post Reply
            </Button>
            <Button variant="link" size="sm" onClick={(e) => reset()}>
              Cancel
            </Button>
          </p>
        </div>
      )}
    </form>
  );
}
