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
import SinglePage from './pages/SinglePage.jsx';
import SignUp from './pages/SignUp.jsx';
import Politics from './components/Politics.jsx'
import Technology from './components/Techology.jsx';
import Sport from './components/Sport.jsx';

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
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/:collection/:id",
          element: <SinglePage />,
          loader: async ({ params }) => {
            const { collection, id } = params;
            console.log("🚀 Loader called with:", collection, id);
          
            if (!collection || !id) {
              throw new Error("Missing collection or ID in the route.");
            }
          
            const blogRef = doc(db, collection, id);
            const blogSnap = await getDoc(blogRef);
          
            if (!blogSnap.exists()) {
              console.error("❌ Blog not found in Firestore:", collection, id);
              throw new Error("Blog not found");
            }
          
            return { id: blogSnap.id, ...blogSnap.data() };
          },
        },
        
        {
          path: "/login",
          element: <Login setIsAuth={setIsAuth} />, // Pass setIsAuth to Login
        },
        {
          path: "/signUp",
          element: <SignUp/>
        },{
          path:"/politics",
          element: <Politics/>
        },{
          path: "/sport",
          element: <Sport/>
        },
        {
          path: "/technology",
          element: <Technology/>
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