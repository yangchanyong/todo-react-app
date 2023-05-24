import { API_BASE_URL } from '../api-config'

export function call(api, method, request) {
  let headers = new Headers({
    'Content-Type' : 'application/json'
  });
  const access_token = localStorage.getItem("ACCESS_TOKEN");
  if(access_token && access_token !== null) {
  // if(access_token) { 이 방법으로 해도 된다.
    headers.append("Authorization", "Bearer " + access_token);
  }

  let options = {
    headers,
    url : API_BASE_URL + api,
    method : method,
  }

  if(request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((resp) => {
      if(resp.status === 200) {
        return resp.json();
      }
      else if (resp.status === 403) {
        window.location.href = "/login";
      }else {
        Promise.reject(resp);
        throw Error(resp);
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((resp) => {
    console.log(resp);
    if(resp.token) {
      window.location.href = "/";
      localStorage.setItem("ACCESS_TOKEN", resp.token);
    }
    // alert(resp.token);
  })
}

export function socialLogin(provider) {
  window.location.href = 
    API_BASE_URL + 
    "/oauth2/auth/" + 
    provider + 
    "?redirect_url=" + 
    (window.location.protocol + "//" + window.location.host);
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href="/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}