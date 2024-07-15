export const API_URL = "http://localhost:5050";

export const checkAuthStatus = async () => {
  const response = await fetch('http://localhost:5050/auth/status', {
    credentials: 'include', // important to include cookies
  });
  const data = await response.json();
  return data.authenticated;
};

export const logOut = async () => {
  const result = await fetch('http://localhost:5050/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return result.json();
};