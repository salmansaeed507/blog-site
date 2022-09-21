import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserActions } from './UserActions';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export function Navbar() {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          KWANSO
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button sx={{ color: '#fff' }}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Button>
          <Button sx={{ color: '#fff' }}>
            <Link to="/blogs" className="nav-link">
              Blogs
            </Link>
          </Button>
        </Box>
        <UserActions />
      </Toolbar>
    </AppBar>
  );
}
