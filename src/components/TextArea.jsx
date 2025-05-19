import React from 'react';

const TextArea = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-white/80 mb-2" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows="4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 
        focus:outline-none focus:border-green-500 transition-colors resize-none"
      ></textarea>
    </div>
  );
};

export default TextArea;