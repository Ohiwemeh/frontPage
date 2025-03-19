import { FaClock, FaUser, FaCopy, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useState } from 'react';

const SinglePage = () => {
  const blog = useLoaderData(); // Fetch the blog data using the loader
  const [isCopied, setIsCopied] = useState(false); // State for copy link feedback

  // Check if blog data is available
  if (!blog) {
    return <div>Loading...</div>; // or handle the error appropriately
  }

  const { title, image, published_date, reading_time, content, id } = blog;

  // Function to copy the blog post link, title, and image to the clipboard
  const copyLink = () => {
    const blogUrl = `${window.location.origin}/blogs/${id}`; // Construct the full URL
    const shareText = `Check out this blog post: ${title}\n${blogUrl}\n\n${image}`; // Include title, URL, and image

    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        setIsCopied(true); // Show success feedback
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link. Please try again.');
      });
  };

  // Function to share on social media
  const shareOnSocialMedia = (platform) => {
    const blogUrl = `${window.location.origin}/blogs/${id}`;
    const shareText = `Check out this blog post: ${title}\n${blogUrl}`; // Include title and URL

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}&quote=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}&summary=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      default:
        break;
    }
  };

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

          {/* Author and Date */}
          <p className='mb-3 text-gray-600'>
            <FaUser className='inline-flex items-center mr-2' />
            {blog.authorName.name} | {published_date || 'Unknown Date'}
          </p>
          <p className='mb-3 text-gray-600'>
            <FaClock className='inline-flex items-center mr-2' />
            {reading_time || 'Unknown Reading Time'}
          </p>

          {/* Share Icons */}
          <div className='flex items-center space-x-4 mb-6'>
            <span className='text-gray-600'>Share:</span>
            <button
              onClick={copyLink}
              className='text-gray-600 hover:text-black transition-colors'
              title='Copy Link'
            >
              <FaCopy className='inline-block' />
              {isCopied && <span className='ml-2 text-sm text-green-600'>Copied!</span>}
            </button>
            <button
              onClick={() => shareOnSocialMedia('twitter')}
              className='text-gray-600 hover:text-blue-500 transition-colors'
              title='Share on Twitter'
            >
              <FaTwitter className='inline-block' />
            </button>
            <button
              onClick={() => shareOnSocialMedia('facebook')}
              className='text-gray-600 hover:text-blue-700 transition-colors'
              title='Share on Facebook'
            >
              <FaFacebook className='inline-block' />
            </button>
            <button
              onClick={() => shareOnSocialMedia('linkedin')}
              className='text-gray-600 hover:text-blue-600 transition-colors'
              title='Share on LinkedIn'
            >
              <FaLinkedin className='inline-block' />
            </button>
          </div>

          {/* Blog Content */}
          <p className='text-base text-gray-500 mb-6'>
            {typeof content === 'string' ? content : JSON.stringify(content)}
          </p>
        </div>

        {/* Sidebar */}
        <div className='lg:w-1/2'>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;