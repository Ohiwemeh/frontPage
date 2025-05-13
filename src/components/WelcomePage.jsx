import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Container, styled } from '@mui/material';
import { Link } from 'react-router-dom';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.2)',
  },
});

const CategoryTitle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  color: 'white',
  fontWeight: 'bold',
  zIndex: 1,
}));

const WelcomePage = () => {
  const categories = [
    {
      name: 'politics',
      title: 'Politics',
      description: 'Explore the latest political news, analysis, and commentary from around the world.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'sport',
      title: 'Sports',
      description: 'Get updates on your favorite teams, players, and major sporting events worldwide.',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'technology',
      title: 'Technology',
      description: 'Discover cutting-edge tech innovations, gadgets, and industry trends shaping our future.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to AfricanTimes
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary">
            Your gateway to curated content across politics, sports, and technology
          </Typography>
        </Container>
      </HeroSection>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'medium', mb: 6 }}>
          Explore Our Categories
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category.name} xs={12} sm={6} md={4}>
              <Link to={`/${category.name}`} style={{ textDecoration: 'none' }}>
                <StyledCard>
                  <StyledCardMedia
                    image={category.image}
                    title={category.title}
                  >
                    <CategoryTitle variant="h5">{category.title}</CategoryTitle>
                  </StyledCardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="body1" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Explore {category.title}
                    </Button>
                  </Box>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

     
    </Box>
  );
};

export default WelcomePage;