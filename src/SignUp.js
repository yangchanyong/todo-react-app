import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from './service/ApiService';

const Login = () => {
// 로그인 버튼이벤트
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const username = data.get("username");
  const password = data.get("password");
  signup({ username, password }).then(
    (resp) => (window.location.href ="/login")
  );
};

  return (
    <Container 
      component='main' 
      maxWidth='xs' 
      style={{ marginTop: '8%', marginBottom: 20}}
    >
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography component='h1' variant='h5'>
            계정 생성
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              variant='outlined' 
              required 
              fullWidth 
              id='username' 
              name='username'
              label='아이디'
              autoComplete='username'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              variant='outlined' 
              required 
              fullWidth 
              id='password' 
              name='password'
              type='password'
              label='패스워드'
              autoComplete='password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' fullWidth variant='contained' color='primary'>
              계정 생성
            </Button>
          </Grid>
          </Grid>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                이미 계정이 있습니까? 로그인 하세요
              </Link>
            </Grid>
          </Grid>
      </form>
    </Container>
  )
};

export default Login;