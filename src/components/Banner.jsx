import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa6'
// import banner from '../assets/images/pexels-suzyhazelwood-3601081.jpg'

const Banner = () => {
  return (
    <div className='bg-[url("https://img.freepik.com/free-vector/cool-blue-parchment_53876-86280.jpg?t=st=1741781608~exp=1741785208~hmac=86e121a1c4d2b5652d78c14a11b31aa30d2075f96f802e7b87e7c045022cf7b9&w=1060")] bg-no-repeat bg-cover px-4 py-32 blog w-auto h-auto mx-auto '>
      <div className='text-zinc-800 text-center'>
        < h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'> Welcome To Our Blog</h1>
        <p className='text-zinc-600  lg:w-3/5 mx-auto mb-5 font-primary'>Start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas. We offer everything you need to get started, from helpful tips and tutorials</p>
        <div>
          <Link to="/about" className='font-medium hover:text-blue-500 inline-flex items-center py-1'>Learn more <FaArrowRight className='mt-1 ml-2'/></Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
