import { FaClock, FaUser, FaCopy, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
const SinglePage = () => {
  const blog = useLoaderData();
  const [isCopied, setIsCopied] = useState(false);
  const [imageElement, setImageElement] = useState(null);

  // Prepare image element for copying
  useEffect(() => {
    if (!blog?.image) return;
    
    const img = new Image();
    img.src = blog.image;
    img.alt = blog.title;
    img.style.maxWidth = '100%';
    setImageElement(img);
  }, [blog]);


  // Copy post with image to clipboard
  const copyWithImage = async () => {
    try {
      const blogUrl = `${window.location.origin}/${blog.category}/${blog.id}`;
      const text = `Check this: ${blog.title}\n${blogUrl}`;
      
      // Mobile-friendly text copy fallback first
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // For mobile, focus on text copying with image URL
        await navigator.clipboard.writeText(`${text}\n\nImage: ${blog.image}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      }
  
      // Desktop enhanced copy with image
      if (navigator.clipboard && window.ClipboardItem) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = blog.image;
        
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
  
        if (img.complete && img.naturalWidth !== 0) {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob(async (blob) => {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  'text/plain': new Blob([text], { type: 'text/plain' }),
                  'image/png': blob
                })
              ]);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
              fallbackCopy(text, blog.image);
            }
          }, 'image/png');
          return;
        }
      }
      fallbackCopy(text, blog.image);
    } catch (err) {
      fallbackCopy(text, blog.image);
    }
  };
  
  // Separate fallback function
  const fallbackCopy = async (text, imageUrl) => {
    try {
      // Try writing just text
      await navigator.clipboard.writeText(`${text}\n\nImage: ${imageUrl}`);
    } catch (err) {
      // Final fallback for really old browsers
      const textarea = document.createElement('textarea');
      textarea.value = `${text}\n\nImage: ${imageUrl}`;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Share to social media (image will appear if platform supports link previews)
  // const shareToSocial = (platform) => {
  //   const blogUrl = `${window.location.origin}/blogs/${blog.id}`;
  //   const text = `Check out: "${blog.title}"\n${blogUrl}`;
    
  //   switch (platform) {
  //     case 'twitter':
  //       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(blogUrl)}`, '_blank');
  //       break;
  //     case 'facebook':
  //       window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`, '_blank');
  //       break;
  //     case 'whatsapp':
  //       window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const shareToWhatsApp = () => {
    const blogUrl = `${window.location.origin}/${blog.category}/${blog.id}`;
    const text = `Check out: ${blog.title}\n${blogUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTwitter = () => {
    const blogUrl = `${window.location.origin}/${blog.category}/${blog.id}`;
    const text = `Check out: ${blog.title}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(blogUrl)}`,
      '_blank'
    );
  };

  // Set Open Graph meta tags for rich link previews
  useEffect(() => {
    if (!blog) return;

    const metaDescription = blog.content.substring(0, 160);
    document.title = `${blog.title} | Your Blog Name`;
    
    // Remove existing meta tags
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
  }, [blog]);

  if (!blog) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }



  const { title, published_date, reading_time, content, id, authorName } = blog;
  const formattedDate = new Date(published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const theme = useTheme();
const isDarkMode = theme.palette.mode === 'dark';


  return (
    <>
      <div className="max-w-7xl mx-auto mt-32 px-4 sm:px-6 lg:px-8 py-16">
        {/* Blog Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
        <Typography
  variant="h3"
  fontWeight="bold"
  gutterBottom
  sx={{ color: isDarkMode ? 'common.white' : 'grey.900' }}
>
  {title}
</Typography>
          
          <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>Admin</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <Typography>{reading_time || 'Unknown reading time'}</Typography>
            </div>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-12 rounded-xl flex justify-center items-center overflow-hidden ">
            <img 
              src={blog.image} 
              alt={title} 
              className="w-3/4 h-auto max-h-96 rounded-xl object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert">
          {typeof content === 'string' ? (
            content.split('\n').map((paragraph, i) => (
              <Typography key={i}
              sx={{
                mb: 3,
                color: isDarkMode ? 'grey.300' : 'grey.800',
                lineHeight: 1.8,
                fontSize: '1.125rem',
              }}>
                {paragraph}
              </Typography>
            ))
          ) : (
            <Typography >{JSON.stringify(content)}</Typography>
          )}
        </div>

        {/* Share Section */}
        <div className="max-w-2xl mx-auto mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Typography  
  sx={{
    mb: 3,
    color: isDarkMode ? 'grey.300' : 'grey.800',
    lineHeight: 1.8,
    fontSize: '1.125rem',
  }}>
              Share this article
            </Typography>
            <div className="flex space-x-4">
              <button
                 onClick={() => shareToTwitter()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="text-lg" />
              </button>
              {/* <button
                onClick={() => shareToSocial('facebook')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="text-lg" />
              </button> */}
              <button
                  onClick={() => shareToWhatsApp()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </button>
              <button
                onClick={copyWithImage}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
                aria-label="Copy with image"
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
    </>
  );
};

export default SinglePage;