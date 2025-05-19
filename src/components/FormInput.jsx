import React from 'react';

const FormInput = ({ label, type = 'text', name, placeholder, value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-white/80 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 
        focus:outline-none focus:border-green-500 transition-colors"
      />
    </div>
  );
};

export default FormInput;