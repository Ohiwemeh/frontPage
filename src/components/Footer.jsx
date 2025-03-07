//import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='bg-gray-900'>
      <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
        <div className='grid row mb-8 lg:grid-cols-6'>
            <div className='grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4'>
                <div className=''>
                    <p className='font-medium tracking-wide text-gray-300'>Category</p>
                    <ul className='mt-2 space-y-2'>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>News</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>World</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Games</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>References</a>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <p className='font-medium tracking-wide text-gray-300'>Section</p>
                    <ul className='mt-2 space-y-2'>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Cars</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Bmw</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Benz</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>lambo</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>COpart</a>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <p className='font-medium tracking-wide text-gray-300'>Phones</p>
                    <ul className='mt-2 space-y-2'>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>RedEye</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Asus</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Samsung</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Iphone</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Nokia</a>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <p className='font-medium tracking-wide text-gray-300'>Trucks</p>
                    <ul className='mt-2 space-y-2'>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Tundra</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>4x4</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Ram</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>SR-T10</a>
                        </li>
                        <li>
                            <a href="/"className='text-gray-500 transition-colors duration-300 hover:text-orange-400'>Ghost</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='md:max-w-md lg:col-span-2 lg:mt-0 mt-5'>
                    <p className='font-medium tracking-wide text-gray-300'>Subcribe for updates</p>
                    <form className=' mt-4 flex flex-col md:flex-row'>
                       
                        <input type="email" name='email' id='email' className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shawdow-sm aspect-auto md:mr-2 md:mb-0 focus:border-purple-400 focus:outline-none' />
                        <button type='submit' className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md hover:bg-orange-500 focus:outline-none border'>subscribe</button>
                    </form>
                    <p className='mt-4 text-sm text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda aliquam id expedita possimus amet maiores similique, obcaecati sint dolore explicabo?
                    </p>
                </div>
        </div>

        <div className='flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row'>
            <p className='text-sm text-gray-500'>Copyright 2023 | All right resereved</p>
            <div className='flex items-center mt-4 space-x-4 sm:mt-0'>
                <a href="/" className='text-gray-500 transition-all duration-300 hover:text-blue-500'><FaTwitter className='h6 w6'/></a>
                <a href="/" className='text-gray-500 transition-all duration-300 hover:text-blue-500'><FaInstagram className='h6 w6'/></a>
                <a href="/" className='text-gray-500 transition-all duration-300 hover:text-blue-500'><FaFacebook className='h6 w6'/></a>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
