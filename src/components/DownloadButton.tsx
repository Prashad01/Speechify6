import React from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { useDownload } from '../hooks/useDownload';

interface DownloadButtonProps {
  text: string;
  fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ text, fileName }) => {
  const { downloadAsText, downloadAsPDF } = useDownload();

  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => downloadAsText(text, fileName)}
        className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-colors text-xs sm:text-sm"
      >
        <FileDown className="w-3.5 h-3.5" />
        <span>TXT</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => downloadAsPDF(text, fileName)}
        className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition-colors text-xs sm:text-sm"
      >
        <FileDown className="w-3.5 h-3.5" />
        <span>PDF</span>
      </motion.button>
    </div>
  );
};