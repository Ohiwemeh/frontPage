import { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import TestTheme from './TestTheme';

const App = (props) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  // Check authentication state on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
      } else {
        // User is signed out
        localStorage.removeItem('isAuth');
        setIsAuth(false);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  return (
    <TestTheme {...props}>
      <AppAppBar  isAuth={isAuth} setIsAuth={setIsAuth} />
      <Outlet />
      <Footer />
    </TestTheme>
  );
};

export default App;