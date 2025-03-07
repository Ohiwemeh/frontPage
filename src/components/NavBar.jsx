import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaDribbble, FaFacebook, FaTwitter, FaXmark } from 'react-icons/fa6';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar = ({ isAuth, setIsAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('isAuth'); // Remove isAuth from localStorage
        setIsAuth(false); // Update isAuth state
        navigate('/login'); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', link: 'Home' },
    // Conditionally include "Create Post" link if user is authenticated
    ...(isAuth ? [{ path: '/create', link: 'Create' }] : []),
    { path: '/about', link: 'About' },
    { path: '/blogs', link: 'Blogs' },
    { path: '/contact', link: 'Contact' },
  ];

  return (
    <header className='bg-black text-white fixed top-0 right-0 left-0 z-50'>
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <a href='/' className='text-xl font-bold text-white'>
          Blog <span className='text-blue-400'>Jo</span>
        </a>

        {/* Desktop Menu */}
        <ul className='md:flex gap-12 text-lg hidden'>
          {navItems.map(({ path, link }) => (
            <li className='text-white' key={path}>
              <NavLink
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-500')}
                to={path}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Social Icons and Auth Buttons */}
        <div className='text-white lg:flex gap-4 items-center hidden'>
          <a href='https://facebook.com' className='hover:text-blue-500' aria-label='Facebook'>
            <FaFacebook />
          </a>
          <a href='https://dribbble.com' className='hover:text-blue-500' aria-label='Dribbble'>
            <FaDribbble />
          </a>
          <a href='https://twitter.com' className='hover:text-blue-500' aria-label='Twitter'>
            <FaTwitter />
          </a>
          {isAuth ? (
            <button
              onClick={handleLogout}
              className='bg-red-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-red-500 transition-all duration-200 ease-in'
            >
              Log Out
            </button>
          ) : (
            <NavLink to='/login'>
              <button className='bg-blue-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-blue-500 transition-all duration-200 ease-in'>
                Log In
              </button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='cursor-pointer' aria-label='Toggle Menu'>
            {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className='gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white'>
          {navItems.map(({ path, link }) => (
            <li className='text-black' key={path}>
              <NavLink
                onClick={toggleMenu}
                className={({ isActive }) => (isActive ? 'text-blue-500' : 'hover:text-blue-500')}
                to={path}
              >
                {link}
              </NavLink>
            </li>
          ))}
          <li>
            {isAuth ? (
              <button
                onClick={handleLogout}
                className='bg-red-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-red-500 transition-all duration-200 ease-in'
              >
                Log Out
              </button>
            ) : (
              <NavLink to='/login'>
                <button className='bg-blue-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-blue-500 transition-all duration-200 ease-in'>
                  Log In
                </button>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;