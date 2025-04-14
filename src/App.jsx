import { Outlet } from 'react-router-dom';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import TestTheme from './TestTheme';

export default function App() {
  return (
    <TestTheme>
      <AppAppBar/>
      <Outlet />
      <Footer />
    </TestTheme>
  );
}