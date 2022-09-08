import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UploadImage } from '../common/upload-image';
import { UploadedFile } from '../types/uploaded-file.interface';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  if (called && loading) return <div>Saving...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <p></p>
        <h3>Create Blog</h3>
        <Col className="col-md-6">
          <p>Title</p>
          <p>
            <input
              autoFocus
              type="text"
              className="form-control"
              {...register('title')}
            />
          </p>
          {errors.title && <p className="error">{errors.title.message}</p>}

          <p>Description</p>
          <p>
            <textarea className="form-control" {...register('description')} />
          </p>
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}

          <p>Short Description</p>
          <p>
            <textarea
              className="form-control"
              {...register('shortDescription')}
            />
          </p>
          {errors.shortDescription && (
            <p className="error">{errors.shortDescription.message}</p>
          )}

          <p>Content</p>
          <p>
            <textarea className="form-control" {...register('content')} />
          </p>
          {errors.content && <p className="error">{errors.content.message}</p>}

          <p>
            <Button type="submit">Create</Button>
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
