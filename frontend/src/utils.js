export const checkAuthStatus = async () => {
  const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/auth/status', {
     mode: 'cors',
    credentials: 'include', // important to include cookies
  });
  const data = await response.json();
  return data.authenticated;
};

export const logOut = async () => {
  const result = await fetch(process.env.REACT_APP_BACKEND_URL+'/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return result.json();
};
