import { Comment } from './Comment';
import { PostComment } from './PostComment';
import * as _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export function Blog(props: { blog: any }) {
  const [rerender, setRerender] = useState(false);
  const [blog, setBlog] = useState(_.cloneDeep(props.blog));
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate('/blogs/' + blog.id)}>
        <CardMedia component="img" image={blog.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
