import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Box, Typography, Grid,  Card, CardMedia, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

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



export default function Technology() {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const pageSize = 12;

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const postCollectionRef = collection(db, "Technology");
        const data = await getDocs(postCollectionRef);
        const posts = data.docs.map((doc) => {
          const d = doc.data();
          return {
            ...d,
            id: doc.id,
            collectionName: "Technology",
            authorname: {
              name: d.authorName?.name || 'Unknown Author',
              avatar: d.authorName?.avatar || 'https://i.pravatar.cc/150?img=3',
            },
            category: d.category || "Uncategorized",
            date: d.timestamp?.toDate().toLocaleDateString() || 'Unknown date',
          };
        });
        setPostList(posts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  const paginatedBlogs = useMemo(() => {
    return postList.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [postList, currentPage, pageSize]);

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1);
  // };

  const handleFocus = (index) => setFocusedCardIndex(index);
  const handleBlur = () => setFocusedCardIndex(null);

  return (
    <Container
    maxWidth="lg"
    component="main"
    sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h4" gutterBottom>Technology</Typography>

      <Box sx={{ display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
        {/* {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
            color={selectedCategory === category ? "primary" : "default"}
          />
        ))} */}
      </Box>

      {loading ? (
        <div>Loading...</div>
      ) : postList.length === 0 ? (
        <div>No blogs found in Firestore.</div>
      ) : (
        <Grid container spacing={2}>
          {paginatedBlogs.map((blog, index) => (
            <Grid item xs={12} md={6} key={blog.id}>
              <Link to={`/${blog.collectionName}/${blog.id}`} key={blog.id}>
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
                    sx={{ aspectRatio: '16 / 9', borderBottom: '1px solid', borderColor: 'divider' }}
                  />
                  <StyledCardContent>
                    <Typography gutterBottom variant="caption">{blog.category}</Typography>
                    <Typography gutterBottom variant="h6">{blog.title}</Typography>
                    <StyledTypography variant="body2" color="text.secondary">{blog.description}</StyledTypography>
                  </StyledCardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar alt={blog.authorname.name} src={blog.authorname.avatar} sx={{ width: 24, height: 24 }} />
                      <Typography variant="caption">{blog.authorname.name}</Typography>
                    </Box>
                    <Typography variant="caption">{blog.date}</Typography>
                  </Box>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    </Container>
  );
}
