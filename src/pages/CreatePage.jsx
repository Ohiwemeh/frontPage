import { useState } from 'react';
import { db, auth } from '../firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('All'); // State for selected category
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ["Politics", "Sports"]; // List of categories

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        title,
        content,
        image,
        category, // Add the selected category
        authorName: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        published_date: new Date().toISOString(), // Add the current date as the published date
        reading_time: `${Math.ceil(content.split(' ').length / 200)} min`, // Calculate reading time
      };

      // Add the post to the "All" collection
      const allCollectionRef = collection(db, 'All',);
      await addDoc(allCollectionRef, postData);

      // Add the post to the selected category collection if it's not "All"
      if (category !== 'All') {
        const categoryCollectionRef = collection(db, category, 'posts');
        await addDoc(categoryCollectionRef, postData);
      }

      console.log('Document written successfully');

      // Redirect to the home page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

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
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Image URL</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            required
          />
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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out shadow-md"
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;