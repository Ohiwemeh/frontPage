import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Typography, Grid, Chip, Card, CardMedia, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

// const StyledCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   padding: 0,
//   height: '100%',
//   backgroundColor: (theme.vars || theme).palette.background.paper,
//   '&:hover': {
//     backgroundColor: 'transparent',
//     cursor: 'pointer',
//   },
// }));

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));


// const StyledCardContent = styled(CardContent)({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: 4,
//   padding: 16,
//   flexGrow: 1,
//   '&:last-child': {
//     paddingBottom: 16,
//   },
// });

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const categories = ['All', 'Politics', 'sport', 'technology'];

export default function Latest() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  const postCollectionRef = collection(db, 'latest');
  const pageSize = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        const posts = data.docs.map((doc) => {
          const d = doc.data();
          return {
            ...d,
            id: doc.id,
            collectionName: 'latest',
            title: d.title || 'Untitled Post',
            image: d.image || 'https://via.placeholder.com/400x225?text=No+Image',
            description: d.description || 'No description available.',
            authorname: {
              name: d.authorName?.name || 'Unknown Author',
              avatar: d.authorName?.avatar || 'https://i.pravatar.cc/150?img=3',
            },
            category: d.category || 'Uncategorized',
            date: d.timestamp?.toDate().toLocaleDateString() || 'Unknown date',
          };
        });
        setPostList(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') return postList;
    return postList.filter((post) => post.category === selectedCategory);
  }, [postList, selectedCategory]);

  const paginatedBlogs = useMemo(() => {
    return filteredBlogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredBlogs, currentPage]);

 

  const handleFocus = (index) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  if (loading) return <div>Loading...</div>;
  if (!loading && postList.length === 0) return <div>No blogs found in Firestore.</div>;
  if (filteredBlogs.length === 0) return <div>No blogs match this category.</div>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h4" gutterBottom>Latest</Typography>

      {/* <Box sx={{ display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
          />
        ))}
      </Box> */}

      <Grid container spacing={2}>
        {paginatedBlogs.map((blog, index) => (
          <Grid item xs={12} md={6} key={blog.id}>
            <Link to={`/${blog.collectionName}/${blog.id}`} key={blog.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {blog.category || 'General'}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {blog.title}
                <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: '1rem' }} />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {blog.content}
              </StyledTypography>
              <Typography variant="caption">{blog.authorname.name}</Typography>
            </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
