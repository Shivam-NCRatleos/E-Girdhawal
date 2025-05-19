import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UploadImage = ({ user }) => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [location, setLocation] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!locationAllowed && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocationAllowed(true);
          setLocation(pos.coords);
        },
        err => {
          setLocationAllowed(false);
        }
      );
    }
  }, [locationAllowed]);

  useEffect(() => {
    setUploadEnabled(locationAllowed && cameraAllowed);
  }, [locationAllowed, cameraAllowed]);

  useEffect(() => {
    if (cameraAllowed && !streamRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(() => {
          setCameraAllowed(false);
          setCameraError('Camera access denied or unavailable.');
        });
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraAllowed]);

  const handleLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLocationAllowed(true);
          setLocation(pos.coords);
        },
        err => {
          setLocationAllowed(false);
        }
      );
    }
  };

  const handleCameraPermission = () => {
    setCameraError('');
    setCameraAllowed(true);
  };

  // Capture image from video stream
  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 360;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);
    return dataUrl;
  };

  // Upload image to backend
  const handleUpload = async () => {
    setUploading(true);
    const base64Data = captureImage();
    if (!base64Data) return;

    // Convert base64 to Blob
    const res = await fetch(base64Data);
    const blob = await res.blob();

    const formData = new FormData();
    formData.append('image', blob, 'capture.jpg');
    formData.append('userId', user?._id || user?.id || 'guest');

    try {
      const uploadRes = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // If you have auth cookies
      });
      const uploadData = await uploadRes.json();
      setResponse(uploadData.message || 'Image uploaded successfully');
    } catch (err) {
      setResponse('Failed to upload image');
    }
    setUploading(false);
  };

  const handleDisputeForm = () => {
    navigate('/forms?dispute=true');
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
          disabled={locationAllowed}
          className={`px-6 py-2 rounded-full ${
            locationAllowed ? 'bg-green-400' : 'bg-gray-600'
          }`}
        >
          {locationAllowed ? 'Location Granted' : 'Allow Location'}
        </button>
        <button
          onClick={handleCameraPermission}
          disabled={cameraAllowed}
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

      {cameraAllowed && !capturedImage && (
        <div className="mt-6 flex flex-col items-center">
          <video
            ref={videoRef}
            width={700}
            height={460}
            autoPlay
            muted
            playsInline
            className="rounded shadow-lg border border-gray-700"
            style={{ backgroundColor: "#222" }}
          />
        </div>
      )}

      {capturedImage && (
        <div className="mt-6 flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded shadow-lg border border-green-700 max-w-full"
            style={{ maxWidth: "480px", maxHeight: "360px" }}
          />
        </div>
      )}

      {cameraError && <div className="text-red-400 mt-2">{cameraError}</div>}

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
          <h2 className="text-xl font-bold">Upload Result:</h2>
          <p>{response}</p>
          <button
            onClick={handleDisputeForm}
            className="mt-4 px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white"
          >
            Raise Dispute / Open Dispute Form
          </button>
        </div>
      )}

      {location && (
        <div className="mt-4 text-xs text-gray-400">
          Your Location: lat {location.latitude}, long {location.longitude}
        </div>
      )}
    </div>
  );
};

export default UploadImage;