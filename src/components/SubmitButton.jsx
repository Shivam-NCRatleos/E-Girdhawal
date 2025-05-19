import React from 'react';
import { motion } from 'framer-motion';

const SubmitButton = ({ label }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-medium 
      hover:from-green-500 hover:to-blue-600 transition-all duration-200"
    >
      {label}
    </motion.button>
  );
};

export default SubmitButton;