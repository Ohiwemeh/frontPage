import  { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase';

const SideBar = () => {

  const [popularBlogs, setPopularBlogs] = useState([]);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const postCollectionRef = collection(db, "posts");

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
 
  return (
    <div>
      <div>
        <h3 className='text-2xl font-semibold px-4'>Latest Blogs</h3>
        <div>
          {popularBlogs.slice(0, 5).map((postList) => (
            <div key={postList.id} className='my-5 border-b-2 border-spacing-2'>
              <h4 className='font-medium mb-2'>{postList.title}</h4>

              <Link to="/blog" className='text-base pb-2 hover:text-blue-500 inline-flex items-center py-1'>
                Read now <FaArrowRight className='mt-1 ml-2' />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div >
        <h3 className='text-2xl font- mt-20 px-4'>Popular Blogs</h3>
        <div>
          {popularBlogs.slice(6, 10).map((postList) => (
            <div key={postList.id} className='my-5 border-b-2 border-spacing-2'>
              <h4 className='font-medium mb-2'>{postList.title}</h4>

              <Link to="/blog/:id" className='text-base pb-2 hover:text-blue-500 inline-flex items-center py-1'>
                Read now <FaArrowRight className='mt-1 ml-2' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
