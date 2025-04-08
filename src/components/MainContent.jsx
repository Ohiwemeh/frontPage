import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authors, published_date }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">{published_date}</Typography>
    </Box>
  );
}

Author.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  date: PropTypes.string.isRequired,
};



export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  const postCollectionRef = collection(db, "All");
  const pageSize = 12;

  // Fetch posts from Firestore
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        const posts = data.docs.map((doc) => ({ 
          ...doc.data(), 
          id: doc.id,
          // Format the author data to match the expected structure
          authorname: {
            name: doc.data().authorName?.name || 'Unknown Author',
            avatar: doc.data().authorName?.avatar || 'https://i.pravatar.cc/150?img=3'
          },
          // Format the date
          date: doc.data().timestamp?.toDate().toLocaleDateString() || 'Unknown date'
        }));
        console.log("Fetched posts:", posts);
        setPostList(posts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  // Filter blogs by selected category
  const filteredBlogs = useMemo(() => {
    if (!postList) return [];
    if (!selectedCategory || selectedCategory === "All") return postList;
    return postList.filter((post) => post.category === selectedCategory);
  }, [postList, selectedCategory]);

  // Paginate blogs
  const paginatedBlogs = useMemo(() => {
    return filteredBlogs.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredBlogs, currentPage, pageSize]);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle loading and no blogs found states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && postList.length === 0) {
    return <div>No blogs found.</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom className='bg-gradient-to-br from-green-200 to-teal-900 bg-clip-text text-transparent'>
          FrontPage
        </Typography>
        <Typography>Start your blog today and join a community of writers.</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip 
            onClick={() => handleCategoryClick("All")} 
            size="medium" 
            label="All categories" 
            color={selectedCategory === "All" ? "primary" : "default"}
          />
          <Chip
            onClick={() => handleCategoryClick("Company")}
            size="medium"
            label="Company"
            color={selectedCategory === "Company" ? "primary" : "default"}
          />
          <Chip
            onClick={() => handleCategoryClick("Product")}
            size="medium"
            label="Product"
            color={selectedCategory === "Product" ? "primary" : "default"}
          />
          <Chip
            onClick={() => handleCategoryClick("Design")}
            size="medium"
            label="Design"
            color={selectedCategory === "Design" ? "primary" : "default"}
          />
          <Chip
            onClick={() => handleCategoryClick("Engineering")}
            size="medium"
            label="Engineering"
            color={selectedCategory === "Engineering" ? "primary" : "default"}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {paginatedBlogs.map((blog, index) => (
          <Grid item xs={12} md={6} key={blog.id}>
           <Link to={`/blogs/${blog.id}`} key={blog.id}>
           <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === index ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt={blog.title}
                image={blog.image}
                sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {blog.category || 'Uncategorized'}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {blog.description}
                </StyledTypography>
              </StyledCardContent>
              <Author 
                authors={[blog.authorname]} 
                date={blog.date}
              />
            </StyledCard>
           </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}