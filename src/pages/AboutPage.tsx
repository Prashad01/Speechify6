import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Globe, Github, Linkedin, Twitter } from 'lucide-react';


const AboutPage: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const developers = [
    {
      name: "Prashad Nath",
      role: "Lead Developer",
      image: "/images/Prashad_DP.jpg",
      bio: "Full-stack developer with expertise in speech recognition and AI technologies.",
      social: {
        github: "https://github.com/Prashad01",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Amar Jyoti Nath",
      role: "UI/UX Designer",
      image: "/images/amar_dp.jpeg",
      bio: "Passionate about creating accessible and intuitive user interfaces.",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          About Speechify
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Empowering voices, transforming education
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          {...fadeIn}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <Users className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            To make education accessible to everyone through innovative speech-to-text technology.
          </p>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <Heart className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Our Values
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Inclusivity, innovation, and dedication to improving the learning experience.
          </p>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <Globe className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Our Impact
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Helping students and professionals worldwide capture and retain knowledge effectively.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {developers.map((dev, index) => (
          <motion.div
            key={dev.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:w-48 object-cover"
                  src={dev.image}
                  alt={dev.name}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-500 dark:text-blue-400 font-semibold">
                  {dev.role}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {dev.name}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {dev.bio}
                </p>
                <div className="mt-4 flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={dev.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={dev.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={dev.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default AboutPage;