import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Blog } from '../Blog';
import { io } from 'socket.io-client';

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

  const [queryFunc] = useLazyQuery(SEARCH_BLOGS);
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <div>Loading</div>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;

  return (
    <Row className="blog-container">
      <form onSubmit={handleSearch}>
        <Row>
          <Col className="col-md-8">
            <p>
              <input
                type="text"
                className="form-control"
                placeholder="Search Blogs"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </p>
          </Col>
          <Col className="col-md-4">
            <Button type="submit" className="form-control">
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
