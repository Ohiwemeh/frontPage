import { useRouteError, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function BlogNotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center',
      p: 3
    }}>
      <Typography variant="h4" gutterBottom>
        Blog Post Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The blog post you're looking for doesn't exist or may have been removed.
      </Typography>
      <Button 
        variant="contained" 
        component={Link} 
        to="/"
        sx={{ mt: 2 }}
      >
        Return to Home
      </Button>
    </Box>
  );
}
