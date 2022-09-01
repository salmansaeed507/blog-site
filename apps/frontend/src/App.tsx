import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './Home';
import { Login } from './Login';
import { PrivateRoute } from './PrivateRoute';
import { isAuthenticated, logoutUser } from './authFunc';
import { Button } from 'react-bootstrap';
import { BlogPage } from './blogs/blog-page';
import { CreateBlog } from './blogs/create-blog';
import { SingleBlogPage } from './blogs/single-blog-page';

function App() {

  const navigate = useNavigate()


  return (
    <div className="App">
      { isAuthenticated() && <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">React</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/blogs">Blogs</a>
                    </li>
                    <li className="nav-item">
                        { isAuthenticated() ?
                         <Button variant='link' onClick={() => logoutUser().then(() => navigate("/")) }>Logout</Button> : 
                         <a className="nav-link disabled" href="/login">Login</a> }
                    </li>
                </ul>
                </div>
            </div>
      </nav> }

      <div className='container'>
        <Routes>
          <Route path='/' element={<Navigate to="blogs" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' />
          <Route path='/blogs' element={
            <PrivateRoute>
              <BlogPage />
            </PrivateRoute>
          } />
          <Route path='/blogs/create' element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          } />
          <Route path='/blogs/:id' element={
            <PrivateRoute>
              <SingleBlogPage />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
