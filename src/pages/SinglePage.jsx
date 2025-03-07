import { FaClock, FaUser } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import SideBar from '../components/SideBar';

const SinglePage = () => {
  const blog = useLoaderData(); // Fetch the blog data using the loader

  // Debug: Log the blog data
  console.log("Blog:", blog);
  console.log("Author:", blog.author);
  console.log("Author Name:", blog.author?.id.name || blog.author?.Name);

  // Check if blog data is available
  if (!blog) {
    return <div>Loading...</div>; // or handle the error appropriately
  }

  const { title, image, published_date, reading_time, content, author } = blog;

  return (
    <div>
      <div className='py-40 bg-black text-center text-white px-4'>
        <h2 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'>{title}</h2>
      </div>

      <div className='max-w-7xl mx-auto my-12 flex flex-col md:flex-row gap-12'>
        <div className='lg:w-3/4 mx-auto'>
          <div>
            <img src={image} alt="" className='w-full mx-auto rounded' />
          </div>
          <h2 className='text-3xl mt-8 font-bold mb-4 text-blue-500 cursor-pointer'>{title}</h2>
          <p className='mb-3 text-gray-600'>
            <FaUser className='inline-flex items-center mr-2' />
            {typeof author === 'string' ? author : author?.name || author?.Name || 'Unknown Author'} | {published_date || 'Unknown Date'}
          </p>
          <p className='mb-3 text-gray-600'>
            <FaClock className='inline-flex items-center mr-2' />{reading_time || 'Unknown Reading Time'}
          </p>
          <p className='text-base text-gray-500 mb-6'>
            {typeof content === 'string' ? content : JSON.stringify(content)}
          </p>
        </div>
        <div className='lg:w-1/2'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;