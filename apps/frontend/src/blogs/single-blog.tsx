import { gql, useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from '@mui/material';
import { BlogComments } from './blog-comments';

const GET_BLOG = gql`
  query GetBlog($blogId: String!) {
    blog(blogId: $blogId) {
      id
      title
      description
      shortDescription
      content
      imageUrl
      user {
        email
      }
      comments {
        data {
          id
          comment
          user {
            email
          }
          replies {
            id
            comment
            user {
              email
            }
          }
        }
        nextCursor
      }
    }
  }
`;

export function SingleBlog(props: { id: string | undefined }) {
  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: {
      blogId: props.id,
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <div>Error!</div>;

  const blog = data.blog;

  return (
    <div className="well">
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={blog.imageUrl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
          <BlogComments comments={blog.comments} blogId={blog.id} />
        </CardContent>
      </Card>
    </div>
  );
}
