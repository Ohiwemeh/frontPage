import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './error.page.jsx';
import './index.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
// import Blogs from './pages/NewBlog.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import CreatePost from './pages/CreatePage.jsx';
import SinglePage from './pages/SinglePage.jsx';
import SignUp from './pages/SignUp.jsx';

// Root component to manage isAuth state
const Root = () => {
  const [isAuth, setIsAuth] = useState(false); // Authentication state

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App isAuth={isAuth} setIsAuth={setIsAuth} />, // Pass isAuth and setIsAuth to App
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/blogs",
        //   element: <Blogs />,
        // },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: '/create',
          element: <CreatePost />, // Add the CreatePost route
        },
  
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/blogs/:id", // Dynamic route for SinglePage
          element: <SinglePage />,
          loader: async ({ params }) => {
            const blogRef = doc(db, "All", params.id); // Reference to the specific blog post
            const blogSnap = await getDoc(blogRef);
  
            if (!blogSnap.exists()) {
              throw new Error("Blog not found");
            }
  
            return { id: blogSnap.id, ...blogSnap.data() }; // Return the blog data with ID
          },
        },
        {
          path: "/login",
          element: <Login setIsAuth={setIsAuth} />, // Pass setIsAuth to Login
        },
        {
          path: "/signUp",
          element: <SignUp/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);