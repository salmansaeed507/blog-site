import { gql, useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UploadImage } from '../common/upload-image';
import { UploadedFile } from '../types/uploaded-file.interface';

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

export function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<UploadedFile>({});
  const navigate = useNavigate();

  const [mutationFunc, { loading, called }] = useMutation(
    CREATE_BLOG_MUTATION,
    {
      onCompleted: () => navigate('/blogs'),
    }
  );

  function formHandler(e: FormEvent) {
    e.preventDefault();
    mutationFunc({
      variables: {
        createBlogInput: {
          title,
          description,
          shortDescription,
          content,
          image: image.filename,
        },
      },
    });
  }

  if (called && loading) return <div>Saving...</div>;

  return (
    <form onSubmit={(e) => formHandler(e)}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>

          <p>Description</p>
          <p>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>

          <p>Short Description</p>
          <p>
            <textarea
              className="form-control"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </p>

          <p>Content</p>
          <p>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </p>

          <p>
            <Button type="submit">Create</Button>
          </p>
        </Col>
        <Col className="col-md-6">
          <p>Image</p>
          <p>
            <UploadImage onChange={(f: UploadedFile) => setImage(f)} />
          </p>
        </Col>
      </Row>
    </form>
  );
}
