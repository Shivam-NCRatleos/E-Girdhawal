import React, { useState } from 'react';
import Header from '../components/Header';
import SubmitButton from '../components/SubmitButton';

const RemoveUser = () => {
  const [formData, setFormData] = useState({
    reason: '',
    password: '',
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setButtonEnabled(formData.reason && formData.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Removed:', formData);
    // Add API call or backend integration here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header
        title="Remove User"
        description="Enter the reason for removal and your password to confirm."
      />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">Reason</label>
            <input
              type="text"
              name="reason"
              placeholder="Enter the reason for user removal"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 
              focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 
              focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <SubmitButton label="Remove User Forever" disabled={!buttonEnabled} />
        </form>
      </div>
    </div>
  );
};

export default RemoveUser;