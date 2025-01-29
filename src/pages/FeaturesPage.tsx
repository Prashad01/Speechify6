import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Brain, 
  Download, 
  Moon, 
  Languages, 
  Share2, 
  Mic2
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Real-time Speech Recognition",
      description: "Convert speech to text instantly with high accuracy and natural language processing."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Analysis",
      description: "Analyze text for key terms, patterns, and important concepts automatically."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Easy Export",
      description: "Export your transcripts in multiple formats for easy sharing and reviewing."
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Dark Mode",
      description: "Comfortable viewing experience in any lighting condition with dark mode support."
    },
    {
      icon: <Languages className="w-8 h-8" />,
      title: "Multi-language Support",
      description: "Support for multiple languages and accents for global accessibility."
    },
    {
      icon: <Mic2 className="w-8 h-8" />,
      title: "Text to Voice",
      description: "Convert the text into AI voice. "
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
          Powerful Features
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Everything you need for efficient lecture capture and analysis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-blue-500 dark:text-blue-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Ready to Transform Your Learning Experience?
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full shadow-lg"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;