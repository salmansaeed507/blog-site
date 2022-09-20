import react, { FormEvent, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, loginUser, setToken } from './authFunc';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, CircularProgress, TextField, Typography } from '@mui/material';

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
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    setIsLoading(true);
    loginUser(data.email, data.password)
      .then((data: any) => {
        setToken(data.data.data.login);
        navigate('/');
      })
      .catch((e) => {
        setError('Email or Password is incorrect!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return isAuthenticated() ? (
    <Navigate to="/" />
  ) : (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col className="col-3 offset-4">
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="h4">Login</Typography>
          {errors.loginFailed && (
            <p className="error">Email or pasword is incorrect</p>
          )}
          <p>
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ''}
              label="Email"
              variant="standard"
              {...register('email', { required: true })}
            />
          </p>
          <p>
            <TextField
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ''}
              type="password"
              label="Password"
              variant="standard"
              {...register('password')}
            />
          </p>
          <p>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" type="submit">
                Login
              </Button>
            )}
          </p>
        </Col>
      </Row>
    </form>
  );
}
