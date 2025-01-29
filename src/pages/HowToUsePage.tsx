import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Save,
  FileText,
  Settings,
  Download,
  Share
} from 'lucide-react';

const HowToUsePage: React.FC = () => {
  const steps = [
    {
      icon: <Mic />,
      title: "Start Recording",
      description: "Click the microphone button to begin capturing audio from your lecture or meeting."
    },
    {
      icon: <FileText />,
      title: "View Transcript",
      description: "Watch as your speech is converted to text in real-time with high accuracy."
    },
    {
      icon: <Settings />,
      title: "Customize Settings",
      description: "Adjust language preferences and recognition settings to match your needs."
    },
    {
      icon: <Save />,
      title: "Save Your Work",
      description: "Save your transcripts securely to access them anytime, anywhere."
    },
    {
      icon: <Download />,
      title: "Export",
      description: "Download your transcripts in various formats for easy sharing and reviewing."
    },
    {
      icon: <Share />,
      title: "Share",
      description: "Collaborate with others by sharing your transcripts securely."
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
          How to Use Speechify
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Follow these simple steps to get started
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-start gap-6 mb-12"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Pro Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              For Best Results
            </h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Use a good quality microphone</li>
              <li>• Minimize background noise</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Keyboard Shortcuts
            </h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Space: Start/Stop recording</li>
              <li>• Ctrl + S: Save transcript</li>
              <li>• Ctrl + E: Export transcript</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToUsePage;