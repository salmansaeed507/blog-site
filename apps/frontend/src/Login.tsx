import react, { FormEvent, useState } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, loginUser, setToken } from './authFunc';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormValues {
  email: string;
  password: string;
  loginFailed: any;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    loginUser(data.email, data.password)
      .then((data: any) => {
        setToken(data.data.data.login);
        navigate('/');
      })
      .catch((e) => {
        setError('loginFailed', { message: 'Email or Password is incorrect!' });
      });
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col className="col-3 offset-4">
          <h2>Login</h2>
          {errors.loginFailed && (
            <p className="error">Email or pasword is incorrect</p>
          )}
          <label>Email</label>
          <p>
            <input
              type="text"
              autoFocus
              className="form-control"
              {...register('email', { required: true })}
            />
          </p>
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label>Password</label>
          <p>
            <input
              type="password"
              className="form-control"
              {...register('password')}
            />
          </p>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <p>
            <Button type="submit">Login</Button>
          </p>
        </Col>
      </Row>
    </form>
  );
}
