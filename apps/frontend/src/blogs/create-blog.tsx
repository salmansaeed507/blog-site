import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UploadImage } from '../common/upload-image';
import { UploadedFile } from '../types/uploaded-file.interface';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog($createBlogInput: CreateBlogInput!) {
    createBlog(createBlogInput: $createBlogInput) {
      id
      title
      description
      shortDescription
      content
      createdAt
      updatedAt
      user {
        email
      }
    }
  }
`;

interface IFormValues {
  title: string;
  shortDescription: string;
  description: string;
  content: string;
  image: string | undefined;
}

const schema = yup
  .object({
    title: yup.string().required().max(100),
    shortDescription: yup.string().required().max(250),
    description: yup.string().required().max(500),
    content: yup.string(),
    image: yup.string(),
  })
  .required();

export function CreateBlog() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [mutationFunc, { loading, called }] = useMutation(
    CREATE_BLOG_MUTATION,
    {
      onCompleted: () => navigate('/blogs'),
    }
  );

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    mutationFunc({
      variables: {
        createBlogInput: {
          ...data,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <p></p>
        <Typography variant="h4">Create Blog</Typography>
        <Col className="col-md-6">
          <p>
            <TextField
              fullWidth
              label="Title"
              variant="standard"
              {...register('title')}
              error={!!errors.title || false}
              helperText={errors.title?.message || ''}
            ></TextField>
          </p>
          <p>
            <TextField
              fullWidth
              label="Description"
              variant="standard"
              multiline
              {...register('description')}
              error={!!errors.description || false}
              helperText={errors.description?.message || ''}
            ></TextField>
          </p>
          <p>
            <TextField
              fullWidth
              label="Short Description"
              variant="standard"
              multiline
              {...register('shortDescription')}
              error={!!errors.shortDescription || false}
              helperText={errors.shortDescription?.message || ''}
            ></TextField>
          </p>
          <p>
            <TextField
              fullWidth
              label="Content"
              variant="standard"
              multiline
              {...register('content')}
              error={!!errors.content || false}
              helperText={errors.content?.message || ''}
            ></TextField>
          </p>
          <p>
            {called && loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" type="submit">
                Create
              </Button>
            )}
          </p>
        </Col>
        <Col className="col-md-6">
          <p>Image</p>
          <p>
            <UploadImage
              onChange={(f: UploadedFile) => setValue('image', f.filename)}
            />
          </p>
        </Col>
      </Row>
    </form>
  );
}
