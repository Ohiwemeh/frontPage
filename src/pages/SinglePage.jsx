import { FaClock, FaUser, FaCopy, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const SinglePage = () => {
  const blog = useLoaderData();
  const [isCopied, setIsCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Set meta tags for rich sharing previews
  useEffect(() => {
    if (blog) {
      const metaDescription = blog.content.substring(0, 160);
      document.title = `${blog.title} | Your Blog Name`;
      
      // Clean up existing meta tags
      const existingMetaTags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
      existingMetaTags.forEach(tag => tag.remove());

      // Add new meta tags
      const metaTags = [
        { property: 'og:title', content: blog.title },
        { property: 'og:description', content: metaDescription },
        { property: 'og:image', content: blog.image },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: blog.title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'twitter:image', content: blog.image }
      ];

      metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        Object.entries(tag).forEach(([key, value]) => meta.setAttribute(key, value));
        document.head.appendChild(meta);
      });
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const { title, image, published_date, reading_time, content, id, authorName } = blog;

  // Enhanced sharing function
  const shareContent = (platform) => {
    const blogUrl = `${window.location.origin}/blogs/${id}`;
    const shareText = `Check out: "${title}"\n${blogUrl}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(blogUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${image}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n\n${image}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
      default:
        break;
    }
  };

  // Format date
  const formattedDate = new Date(published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mt-44">
      <Helmet className="mt-44">
        <title>{title} | Your Blog Name</title>
        <meta name="description" content={content.substring(0, 160)} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Blog Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {title}
          </h1>
          
          <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>{authorName?.name || 'Unknown Author'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>{reading_time || 'Unknown reading time'}</span>
            </div>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          {image && (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto max-h-96 object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          )}
        </div>

        {/* Blog Content */}
        <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert">
          {typeof content === 'string' ? (
            content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{JSON.stringify(content)}</p>
          )}
        </div>

        {/* Share Section */}
        <div className="max-w-2xl mx-auto mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Share this article
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => shareContent('twitter')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="text-lg" />
              </button>
              <button
                onClick={() => shareContent('facebook')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="text-lg" />
              </button>
              <button
                onClick={() => shareContent('whatsapp')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </button>
              <button
                onClick={() => shareContent('copy')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Copy link"
              >
                <FaCopy className="text-lg" />
                {isCopied && (
                  <span className="absolute -mt-12 px-2 py-1 bg-gray-800 text-white text-xs rounded-md">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;