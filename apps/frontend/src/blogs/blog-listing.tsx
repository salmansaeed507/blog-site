import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Blog } from '../Blog';
import { io } from 'socket.io-client';
import { Button, CircularProgress, TextField } from '@mui/material';

const GET_SINGLE_BLOG = gql`
  query Blog($blogId: String!) {
    blog(blogId: $blogId) {
      id
      title
      shortDescription
      imageUrl
      user {
        email
      }
    }
  }
`;

const SEARCH_BLOGS = gql`
  query SearchBlogs($keyword: String!) {
    search(keyword: $keyword) {
      id
      title
      shortDescription
      imageUrl
      user {
        email
      }
    }
  }
`;

const GET_DOGS = gql`
  query {
    blogs {
      id
      title
      shortDescription
      imageUrl
      user {
        email
      }
    }
  }
`;

export function BlogListing() {
  const [keyword, setKeyword] = useState('');
  const [blogs, setBlogs] = useState<any>([]);
  const [isSearch, setIsSearch] = useState(false);

  const [getSingleBlog] = useLazyQuery(GET_SINGLE_BLOG);

  useEffect(() => {
    const socket = io();
    socket.on('connect', function () {
      console.log('Connected to socket.io');
    });
    socket.on('blog:created', function (blogId) {
      getSingleBlog({
        variables: {
          blogId,
        },
      }).then((data) => {
        setBlogs([data.data.blog, ...blogs]);
      });
    });
  });

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!keyword) {
      setBlogs([]);
      setIsSearch(false);
      return;
    }
    queryFunc({
      variables: {
        keyword,
      },
    }).then((d) => {
      setBlogs(d.data.search);
      setIsSearch(true);
    });
  }

  const [queryFunc, searchData] = useLazyQuery(SEARCH_BLOGS);
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading || searchData.loading) return <CircularProgress />;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <Row className="blog-container">
      <form onSubmit={handleSearch}>
        <Row>
          <Col className="col-md-8">
            <p>
              <TextField
                fullWidth
                variant="outlined"
                label="Search"
                value={keyword}
                size="small"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </p>
          </Col>
          <Col className="col-md-4">
            <Button variant="contained" type="submit" className="form-control">
              Search
            </Button>
          </Col>
        </Row>
      </form>
      {!isSearch &&
        data.blogs?.map(function (blog: any) {
          return (
            <Col className="col-4">
              <Blog blog={blog} />
            </Col>
          );
        })}
      {blogs?.map(function (blog: any) {
        return (
          <Col className="col-4">
            <Blog blog={blog} />
          </Col>
        );
      })}
    </Row>
  );
}
