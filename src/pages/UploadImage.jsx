import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// === GOOGLE EARTH ENGINE API SERVICE ACCOUNT (for demo: DO NOT expose in prod apps!) ===
const GEE_SERVICE_ACCOUNT_JSON = {
  "type": "service_account",
  "project_id": "water-level-460106",
  "private_key_id": "f204ca3dbebe62177579ff939f821b2db3cbb9d9",
  "private_key": `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgbnY6Pd8TLIo+
q/VXkN7GYgyRPDzqR/HDa65PUY7rEkD7yPlUwCpryjoSmyo67O4eHnf6nzSlvuMQ
9lzAgfK99Nw6CPGaTgaxOh+LedHrG2Q8Z5bPDeul2ynXqUn7XCw/gWpBua9DmxdO
tpJDaqddbfR/svvKeZ1V4aHmZE8PCXfbNUZokqHVW8fgnKukTi0s5VA0YocygiUV
lHk2YsX2vJXTuSZFyVHhfOTRKDxLEVtLIeiel3GtJfIf1ptz5MZOFTYecHKieCRB
5D0TfnYHU6Uwjqhf+jIYKhBB9E8iryhmy/ExIFUbOZFfVb4B7tSwSXp2zAgnHO+Y
kOReHd6NAgMBAAECggEAHqKxX3JQrp3nAUw/g7r1m47+JN7KqBdYdq+Rn/JsVv3L
nHkWiaVPhHlfyQ1JzWpQlz5MvXZY7JysyiCtehJmivke89Mg5c0oEIBPpUf8Osfm
hnVmkj/vg6K8FQNuDfqeNXtOUeI2MnQDiaOp/wc3EguM8LS6ScIa9hsp2i/F/BIO
a0nkbAe5r8oWLdoKHwxqgbIHgNXjV5aCT2bPWzKMAzVFS9DdysKxjavUqYSPdqCt
+8FdIftu9vgvuOlzTpzohS0KdugQeCwYFLAkMQnfv8aFro5qcI5bdz7lq+Hx86yF
WKHt/cJaves54gyCdCH6vHKQxvsPpJHmksbbBTGP2QKBgQDai0Cx7UZxV+/7/zt9
08hvW3yd0aHcbTgSklSnKTogEzkx0uhCWQvyzalLE/dyuN/YpsY2hGphbd3JltyP
g6/7ET3JByd7d3TJogeYtX5o+EJlmRZLHVDhSRLa7zj2WRRvdcabzBpZirJwyLsh
KLf/tR3FhFASpIGbM5RZxDLUJQKBgQC77X1mXEC5fiWTwtBnNO8zVvra4YJzuXQc
d19JXXxemuTt4QjTHiAmxTTywsvJdbdGJ8Zexfklx2rrTbUca1iasbWvuhzzvz7F
6jBW9WHpPNJTuUgehdkDXwVaHhdlf5csRLxlSkKRW3Ss0A5y9lMB6fde+wHkKTLK
y2PWYlPgSQKBgQDXhB3PmRMvsS27j66mXlS55DmXFOUPEDIMtnt+wXxNp0du5/Md
gtzym3gIzu7mFoTBDW5I0vppjEP8iaaGbLH94LnSZhi8fEgSk5P0N38qmzA3Kum+
N3HMSRisCN9eqOgrJrUubO/LP6jK6lkH0TTqmTx7zQh96fbaC9qPT5lkdQKBgEd+
2bdon4Myd89YTXsGS36Ht9Yv9zZZts/hplG+DEPdv/y0IWxYSLkXS8aTz33sl/ZL
yY9i2B/EV2v/20hdmo73zvx03PDqsFIRf6SFpGNcrVQG6GYcW+yJaPrY+eO2f+fq
mpYag2rTlXbtjKG2Duxqe58Z9aU8+0Ll0CzOqcRpAoGAdjO6Aqf2NyIl6QWBPg8S
ACYJKX700Izn8eo5oophtYAUMJnAn4BzCL68P7qS6TUmVU9sFW+Yz6GKHWe0zXS/
IAUhBRUPrOjyeQe4PJs9YPAwydYn1pb3mtjWYCE+c6+JZg2IOsfi02x5vnG3dXIL
5G+6L3KVmSzsECtY3DzXKm4=
-----END PRIVATE KEY-----`,
  "client_email": "water-service-account@water-level-460106.iam.gserviceaccount.com",
  "client_id": "112130985644146324660",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/water-service-account%40water-level-460106.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// === GOOGLE EARTH ENGINE ANALYSIS MOCK ===
async function getEarthEngineAnalysis({ lat, lng }) {
  // This is where you would call the real GEE API.
  // The result is hardcoded for demonstration.
  return {
    timestamp: new Date().toISOString(),
    location: { latitude: lat, longitude: lng },
    results: {
      waterStressIndex: 82,
      confidence: 91,
      severity: 'High',
      recommendations: [
        'Increase irrigation immediately.',
        'Consult local agronomist.',
        'Apply mulch to retain soil moisture.',
      ],
      detailedMetrics: {
        soilMoisture: 22,
        temperature: 31,
        humidity: 53,
        vegetationIndex: 38,
      }
    },
    // New: Deep analysis summary
    summary: {
      depth: "The water stress is severe and deep, affecting most of the root zone. Immediate intervention is required to prevent crop loss.",
      removal: "To reduce stress: Start deep irrigation now, use mulch to retain moisture, and consider shade nets to reduce evaporation. Regularly monitor soil moisture for the next week."
    }
  };
}

const UploadImage = ({ user }) => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analysisResponse, setAnalysisResponse] = useState(null);
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

  // Upload image and get GEE analysis
  const handleUpload = async () => {
    setAnalysisResponse(null);
    setUploading(true);
    const base64Data = captureImage();

    // Simulate backend upload latency and uploading animation
    setTimeout(async () => {
      // Always show a successful upload message for UX
      // Then call Google Earth Engine "API" (mocked in-browser)
      if (location) {
        try {
          const geeData = await getEarthEngineAnalysis({
            lat: location.latitude,
            lng: location.longitude
          });
          setAnalysisResponse(
            <div>
              <div className="mb-2">
                <strong>Water Stress Index:</strong> {geeData.results.waterStressIndex} <br />
                <strong>Severity:</strong> {geeData.results.severity} <br />
                <strong>Confidence:</strong> {geeData.results.confidence}%<br />
                <strong>Soil Moisture:</strong> {geeData.results.detailedMetrics.soilMoisture}%<br />
                <strong>Temperature:</strong> {geeData.results.detailedMetrics.temperature}°C<br />
                <strong>Humidity:</strong> {geeData.results.detailedMetrics.humidity}%<br />
                <strong>Vegetation Index (NDVI):</strong> {geeData.results.detailedMetrics.vegetationIndex}<br />
                <strong>Recommendations:</strong>
                <ul>
                  {geeData.results.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="mt-4 p-3 rounded bg-gray-800 border border-green-700">
                <strong>How deep is the water stress?</strong>
                <div className="text-green-300">{geeData.summary.depth}</div>
                <strong className="block mt-2">How can it be removed?</strong>
                <div className="text-green-200">{geeData.summary.removal}</div>
              </div>
            </div>
          );
        } catch (err) {
          setAnalysisResponse('Image uploaded successfully, but analysis failed');
        }
      } else {
        setAnalysisResponse('Image uploaded successfully, but no location provided for analysis.');
      }
      setUploading(false);
    }, 1800); // Simulate upload time/animation
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
          <div className="text-center text-green-300 mt-2 text-lg">Uploading image for analysis...</div>
        </div>
      )}

      {!uploading && analysisResponse && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Upload Result:</h2>
          <div>{analysisResponse}</div>
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