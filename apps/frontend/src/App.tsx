import React, { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';
import { isAuthenticated, logoutUser } from './authFunc';
import { BlogPage } from './blogs/blog-page';
import { CreateBlog } from './blogs/create-blog';
import { SingleBlogPage } from './blogs/single-blog-page';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Navbar } from './components/navigation/Navbar';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function App(props: any) {
  const navigate = useNavigate();

  return (
    <div className="App">
      {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Container sx={{ mt: 10 }} maxWidth="md">
        <Routes>
          <Route path="/" element={<Navigate to="blogs" />} />
          <Route path="/logout" />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <BlogPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/create"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute>
                <SingleBlogPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
