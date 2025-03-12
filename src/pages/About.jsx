import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-40 bg-black text-center text-white px-4">
        <h2 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">
          About Us
        </h2>
        <p className="text-gray-200 lg:w-3/5 mx-auto text-xl">
          Welcome to our blog! We are passionate about sharing knowledge, insights, and stories on a wide range of topics, from technology and politics to sports and lifestyle.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Our mission is to provide high-quality, engaging, and informative content that inspires and empowers our readers. We believe in the power of storytelling and strive to create a community where ideas can flourish.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* <h3 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h3> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            {/* <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team Member 1"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                Jane Doe
              </h4>
              <p className="text-gray-600 dark:text-gray-300">Founder & CEO</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Jane is passionate about technology and innovation. She leads the team with a vision to create impactful content.
              </p>
            </div> */}

            {/* Team Member 2 */}
            {/* <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team Member 2"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                John Smith
              </h4>
              <p className="text-gray-600 dark:text-gray-300">Lead Writer</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                John is a seasoned writer with a knack for storytelling. He specializes in politics and sports.
              </p>
            </div> */}

            {/* Team Member 3 */}
            {/* <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
              <img
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team Member 3"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                Emily Clark
              </h4>
              <p className="text-gray-600 dark:text-gray-300">Content Strategist</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Emily ensures our content is engaging, relevant, and aligned with our readers' interests.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Our Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Integrity
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              We are committed to honesty and transparency in everything we do.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Innovation
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              We embrace creativity and continuously strive to improve.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Community
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in building a strong, supportive community of readers and writers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;