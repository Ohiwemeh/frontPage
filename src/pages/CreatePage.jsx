import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import imageCompression from 'browser-image-compression';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  const categories = ["Politics", "Sports", "Technology", "Business", "Health"];

  // Redirect if not logged in
  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/login');
    }
  }, [user, loadingAuth, navigate]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      // Compress image to 500KB max (adjust as needed)
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      setImageFile(compressedFile);
  
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Compression error:", error);
      alert("Failed to process image. Please try another file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to create posts');
      return;
    }

    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      // Convert image to Base64
      const getBase64 = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      };

      const imageBase64 = await getBase64(imageFile);

      const postData = {
        title,
        content,
        image: imageBase64,
        category,
        authorName: { 
          name: user.displayName || 'Anonymous',
          id: user.uid 
        },
        published_date: new Date().toISOString(),
        reading_time: `${Math.ceil(content.split(' ').length / 200)} min`,
      };

      // Add to All collection
      await addDoc(collection(db, 'All'), postData);

      // Add to category collection if not 'All'
      if (category !== 'All') {
        await addDoc(collection(db, category), postData);
      }

      navigate('/');
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) return <div>Loading authentication...</div>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-20 mb-20 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create a New Blog Post</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Content</label>
          <textarea
            id="content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Post Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out shadow-md disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;