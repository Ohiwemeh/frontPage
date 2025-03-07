import { useState, useEffect, useMemo } from 'react';
import BlogCards from './BlogCards';
import Pagination from './Pagination';
import { db } from '../firebase';
import Category from './Category';
import SideBar from './SideBar';
import { collection, getDocs } from 'firebase/firestore';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  const postCollectionRef = collection(db, "posts");
  const pageSize = 12;

  // Fetch posts from Firestore
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log("Fetched posts:", posts); // Debugging log
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
    if (!postList) return []; // Fallback to empty array if postList is undefined
    if (!selectedCategory) return postList; // Return all posts if no category is selected
    return postList.filter((post) => post.category === selectedCategory);
  }, [postList, selectedCategory]);

  // Paginate blogs
  const paginatedBlogs = useMemo(() => {
    return filteredBlogs.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredBlogs, currentPage, pageSize]);

  // Handle loading and no blogs found states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && postList.length === 0) {
    return <div>No blogs found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
  {/* Category Filter */}
  <div className="mb-6">
    <Category
      onSelectCategory={(category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
      }}
      onClearCategory={() => setSelectedCategory(null)}
      selectedCategory={selectedCategory}
    />
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
    {/* Blog Cards */}
    <div className="lg:col-span-3">
      <BlogCards blogs={paginatedBlogs} />
    </div>

    {/* Sidebar */}
    <aside className="lg:col-span-1 lg:sticky lg:top-20">
      <SideBar />
    </aside>
  </div>

  {/* Pagination */}
  <div className="flex justify-center mt-10">
    <Pagination
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      blogs={filteredBlogs}
      pageSize={pageSize}
    />
  </div>
</div>

  );
};

export default BlogPage;