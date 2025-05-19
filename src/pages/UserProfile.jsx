import React, { useState } from 'react';
import Header from '../components/Header';
import SubmitButton from '../components/SubmitButton';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePic: '/path/to/profile-pic.jpg',
  });

  const handleRemoveUser = () => {
    console.log('User removed');
    // Add API call for removing user
  };

  const handleSignOut = () => {
    console.log('User signed out');
    // Add API call for signing out
  };

  const handleEditProfile = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header title="User Profile" description="Manage your profile details and settings." />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={userData.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full border border-white/10"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{userData.name}</h2>
            <p className="text-white/70">{userData.email}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm text-white/80 mb-2">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleEditProfile('name', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-white/80 mb-2">Email</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleEditProfile('email', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <div className="flex space-x-4">
          <SubmitButton label="Sign Out" onClick={handleSignOut} />
          <button
            onClick={handleRemoveUser}
            className="w-full py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-200"
          >
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;