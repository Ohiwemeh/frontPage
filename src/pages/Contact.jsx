import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your EmailJS service ID, template ID, and public key
    emailjs
      .sendForm(
        'service_llla65n', // Service ID
        'template_ea8k26u', // Template ID
        form.current,
        'ywHUlI2bAzjYjHSlv' // Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          alert('Message sent successfully!');
          form.current.reset(); // Reset the form after sending
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className='py-40 bg-black text-center text-white px-4'>
        <h2 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'>Contact Us</h2>
        <p className='text-gray-200 lg:w-3/5 mx-auto'>We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>
      </div>

      {/* Contact Form and Details */}
      <div className='max-w-7xl mx-auto px-4 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div>
            <h3 className='text-3xl font-bold mb-6'>Send Us a Message</h3>
            <form ref={form} onSubmit={sendEmail} className='space-y-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Your Name'
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Your Email'
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
                />
              </div>
              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  rows='5'
                  placeholder='Your Message'
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className='text-3xl font-bold mb-6'>Get in Touch</h3>
            <p className='text-gray-600 mb-6'>We're here to help! Reach out to us via email, phone, or social media.</p>
            <div className='space-y-4'>
              <div>
                <h4 className='font-semibold text-lg'>Email</h4>
                <p className='text-gray-600'>front.page.media11@gmail.com</p>
              </div>
              <div>
                <h4 className='font-semibold text-lg'>Phone</h4>
                <p className='text-gray-600'>+234 80 888 6694</p>
              </div>
              <div>
                <h4 className='font-semibold text-lg'>Social Media</h4>
                <div className='flex space-x-4 mt-2'>
                  <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black'>
                    <i className='fab fa-twitter text-2xl'></i>
                  </a>
                  <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black'>
                    <i className='fab fa-facebook text-2xl'></i>
                  </a>
                  <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black'>
                    <i className='fab fa-instagram text-2xl'></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Optional: Embed a Map */}
            <div className='mt-10'>
              <h4 className='font-semibold text-lg mb-4'>Our Location</h4>
              <div className='w-full h-64 bg-gray-200 rounded-lg overflow-hidden'>
                <iframe
                  title='Location Map'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2d2f2f1c3b4!2sFlinders%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1625075007177!5m2!1sen!2sus'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;