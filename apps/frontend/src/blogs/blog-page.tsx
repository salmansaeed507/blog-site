import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BlogListing } from './blog-listing';

export function BlogPage() {
  const navigate = useNavigate();
  return (
    <>
      <p></p>
      <p>
        <Button variant="contained" onClick={() => navigate('/blogs/create')}>
          Create Blog
        </Button>
      </p>
      <BlogListing />
    </>
  );
}
