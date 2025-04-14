import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import WelcomePage from '../components/WelcomePage.jsx';
import AppTheme from '../shared-theme/AppTheme.jsx'; // Testing a new import to correct import error
import TestTheme from '../TestTheme.jsx';

const Home = (props) => {
  return (
    <TestTheme {...props}>
       <CssBaseline enableColorScheme />
      
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <WelcomePage/>
       
      </Container>
    </TestTheme>
   
  );
};

export default Home;