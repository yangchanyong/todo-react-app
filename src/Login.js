import React from 'react';
import { signin } from './service/ApiService';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
// 로그인 버튼이벤트
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const username = data.get("username");
  const password = data.get("password");
  signin({ username, password }).then((resp) => {
    console.log(resp);
    console.log(resp.status);
  });
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
            로그인
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
              로그인
            </Button>
          </Grid>
        </Grid>
          <Grid container>
            <Grid item>
              <Link to='/signup' variant='body2'>
                계정이 없습니까? 여기서 가입하세요
              </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
};

export default Login;