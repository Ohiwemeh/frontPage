import { FaClock, FaUser } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import SideBar from '../components/SideBar';

const SinglePage = () => {
  const blog = useLoaderData(); // Fetch the blog data using the loader

  

  // Check if blog data is available
  if (!blog) {
    return <div>Loading...</div>; // or handle the error appropriately
  }

  const { title, image, published_date, reading_time, content } = blog;
   console.log("testing this console")
  return (
    <div>
    {/* Replicated Design from the Image */}
    <div className='py-20 bg-gray-100 text-center px-4'>
      <h1 className='text-4xl lg:text-6xl leading-snug font-bold mb-5'>{title}</h1>
      <p className='text-lg text-gray-700'></p>
    </div>

    {/* Interview Section */}
    <div className='max-w-7xl mx-auto my-12 flex flex-col md:flex-row gap-12 p-4'>
      <div className='lg:w-3/4 mx-auto'>
        <div>
          <img src={image} alt="" className='w-full mx-auto rounded' />
        </div>
        
        <p className='mb-3 text-gray-600'>
          <FaUser className='inline-flex items-center mr-2' />
          {blog.authorName.name}| {published_date || 'Unknown Date'}
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