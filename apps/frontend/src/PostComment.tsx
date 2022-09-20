import { gql, useMutation } from '@apollo/client';
import { Loading } from './Loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, TextField } from '@mui/material';

const POST_COMMENT = gql`
  mutation PostComment($blogId: String!, $postCommentInput: PostCommentInput!) {
    postComment(blogId: $blogId, postCommentInput: $postCommentInput) {
      id
      blogId
      comment
      user {
        email
      }
      replies {
        id
        comment
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

export function PostComment(props: {
  blogId: string;
  parentId?: string;
  text?: string;
  onPostComment?: Function;
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

  const [postComment, { loading, error, called }] = useMutation(POST_COMMENT, {
    onCompleted(data) {
      props.onPostComment && props.onPostComment(data.postComment);
      reset();
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    postComment({
      variables: {
        blogId: props.blogId,
        postCommentInput: {
          comment: data.comment,
        },
      },
    });
  };

  if (called && loading) return <CircularProgress />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <div>
      {!watchIsOpen ? (
        <Button
          variant="text"
          size="small"
          onClick={(e) => setValue('isOpen', !watchIsOpen)}
        >
          Comment
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            <TextField
              fullWidth
              multiline
              variant="standard"
              autoFocus
              {...register('comment')}
              error={!!errors.comment || false}
              helperText={errors.comment?.message || ''}
            />
          </p>
          <p>
            <Button variant="contained" size="small" type="submit">
              Post Comment
            </Button>
            <Button variant="text" size="small" onClick={(e) => reset()}>
              Cancel
            </Button>
          </p>
        </form>
      )}
    </div>
  );
}
