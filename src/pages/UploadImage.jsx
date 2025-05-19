import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UploadImage = ({ user }) => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleLocationPermission = () => {
    // Simulate location permission
    setLocationAllowed(true);
    // Check if location matches (simulate)
    setUploadEnabled(cameraAllowed && true); // Replace true with location match condition
  };

  const handleCameraPermission = () => {
    // Simulate camera permission
    setCameraAllowed(true);
    setUploadEnabled(locationAllowed && true); // Replace true with location match condition
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setResponse('low'); // Simulated backend response
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        Hi {user?.name || 'User'}, please allow camera and location permission to continue
      </h1>
      <p className="mb-6">
        After allowing the permissions, you will be able to upload an image for analysis. The upload button will only activate if your location matches the registered field data.
      </p>

      <div className="space-y-4">
        <button
          onClick={handleLocationPermission}
          className={`px-6 py-2 rounded-full ${
            locationAllowed ? 'bg-green-400' : 'bg-gray-600'
          }`}
        >
          {locationAllowed ? 'Location Granted' : 'Allow Location'}
        </button>
        <button
          onClick={handleCameraPermission}
          className={`px-6 py-2 rounded-full ${
            cameraAllowed ? 'bg-green-400' : 'bg-gray-600'
          }`}
        >
          {cameraAllowed ? 'Camera Granted' : 'Allow Camera'}
        </button>
        <button
          onClick={handleUpload}
          disabled={!uploadEnabled}
          className={`px-6 py-2 rounded-full ${
            uploadEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Upload Image
        </button>
      </div>

      {uploading && (
        <div className="mt-6">
          <motion.img
            src="/assets/tractor-animation.gif"
            alt="Uploading..."
            className="w-32 mx-auto"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      )}

      {response && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Analysis Result:</h2>
          <p>
            {response === 'low'
              ? 'Low water scarcity. Recoverable with daily water provided.'
              : 'Other response.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;