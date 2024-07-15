import { useEffect, useState } from 'react';
import { checkAuthStatus } from './../utils';

export const InsidePage = ({ changeIsAuthenticated }) => {
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticatedLocal(authStatus);
      changeIsAuthenticated(authStatus);  // Update parent state
    };
    fetchAuthStatus();
  }, [changeIsAuthenticated]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or some loading spinner
  }
  

  return isAuthenticated ? (
    <>
    <h1>This is the inside page after log in.</h1>
    </>
  ) : <><h1>Cannot Login. Try Again</h1></>;
}