import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCloudUploadAlt,
  FaGavel,
  FaHandHoldingUsd,
  FaComments,
  FaRobot,
  FaChartLine,
  FaBell,
  FaTint,
  FaSeedling,
  FaMicroscope,
  FaDatabase,
  FaUsers,
  FaHandHoldingWater,
  FaChartBar,
  FaLeaf,
} from 'react-icons/fa';
import WeatherCard from '../components/WeatherCard';

const FARMER_ANIMATION_URL = '/assets/farmer-ploughing.gif';

const mainFeatures = [
  {
    icon: FaCloudUploadAlt,
    label: 'Image Upload Tracking',
    description: 'Upload images to keep a track of your field and crop status.',
  },
  {
    icon: FaGavel,
    label: 'Dispute Result',
    description: 'Raise a dispute if you disagree with the ML model’s result.',
  },
  {
    icon: FaHandHoldingUsd,
    label: 'Compensation Request',
    description: 'Request compensation on destroyed crop directly from the app.',
  },
  {
    icon: FaComments,
    label: 'Chat with Authority',
    description: 'Open a chat with the admin/authority for quick support.',
  },
];

const quickLinksFeatures = [
  {
    icon: FaChartLine,
    label: 'Analytics',
    path: '/Charts',
    description: 'View detailed agricultural analytics and trends',
  },
  {
    icon: FaBell,
    label: 'Alerts',
    path: '/DisasterAlerts',
    description: 'Get real-time disaster and weather alerts',
  },
  {
    icon: FaTint,
    label: 'Irrigation',
    path: '/Irrigation',
    description: 'Smart irrigation control and monitoring',
  },
  {
    icon: FaSeedling,
    label: 'Crop Guide',
    path: '/CropSuggestion',
    description: 'Get personalized crop suggestions',
  },
  {
    icon: FaMicroscope,
    label: 'Disease Detection',
    path: '/disease-detection',
    description: 'AI-powered plant disease detection',
  },
  {
    icon: FaDatabase,
    label: 'Crop Data',
    path: '/cropdata',
    description: 'Access comprehensive crop database',
  },
  {
    icon: FaUsers,
    label: 'Connect',
    path: '/Expert',
    description: 'Connect with agriculture experts',
  },
  {
    icon: FaHandHoldingWater,
    label: 'Water Management',
    path: '/WaterManagement',
    description: 'Efficient water conservation techniques',
  },
];

const confusionMatrix = [
  [45, 2, 0],
  [1, 52, 2],
  [0, 3, 48],
];

const matrixLabels = ['Healthy', 'Diseased', 'Destroyed'];

const Homepage = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black relative"
    >
      <div className="relative h-[420px] flex items-center justify-center mb-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={FARMER_ANIMATION_URL}
            alt="Farmer Ploughing Field Animation"
            className="w-full h-full object-cover opacity-80"
            style={{ filter: 'blur(1px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
        </div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to E-Girdhawal
          </h1>
          <p className="text-xl text-white/80 mb-4 font-medium drop-shadow">
            Smart, Transparent & Efficient Crop Monitoring and Compensation Platform
          </p>
        </motion.div>
      </div>

      <section className="container mx-auto px-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Revolutionizing Agriculture
          </h2>
          <p className="text-xl text-white/70">
            Our platform uses cutting-edge technology to empower farmers and authorities with tools to monitor crops, predict losses, and streamline compensation processes.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mb-14">
        <motion.h2
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          About E-Girdhawal
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6">Our Mission</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              At E-Girdhawal, we believe in the power of technology to transform agriculture. 
              Our mission is to provide farmers with innovative tools and expertise that enable sustainable farming practices and improved yields.
            </p>
            <div className="flex items-center gap-2 text-green-400">
              <FaLeaf />
              <span>Sustainable Agriculture</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="/assets/environmental-conservation-plant-sustainability.jpg"
              alt="Agricultural technology"
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Quick Links
        </h2>
        <div className="mb-12">
          <WeatherCard />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-24"
        >
          {quickLinksFeatures.map((feature, index) => (
            <motion.div key={index} variants={item} custom={index}>
              <div
                onClick={() => navigate(feature.path)}
                className="flex flex-col p-6 rounded-2xl bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-500/10 
                backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl hover:shadow-green-500/20 
                hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="text-5xl mb-4 text-white">
                  <feature.icon />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.label}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          About Our ML Model
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <p className="text-white/70 text-lg mb-4">
              Our machine learning model ensures highly accurate crop classification and loss assessment. The confusion matrix below demonstrates its outstanding performance across major crop states:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[320px] bg-white/10 rounded-lg text-white mb-4">
                <thead>
                  <tr>
                    <th className="p-2 border-b border-white/20"></th>
                    {matrixLabels.map((label) => (
                      <th key={label} className="p-2 border-b border-white/20">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {confusionMatrix.map((row, i) => (
                    <tr key={i} className="text-center">
                      <td className="font-semibold p-2 border-b border-white/10">
                        {matrixLabels[i]}
                      </td>
                      {row.map((val, j) => (
                        <td key={j} className="p-2 border-b border-white/10">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <FaChartBar className="text-blue-300 text-2xl" />
              <span className="text-white/60">
                Sample accuracy: <span className="font-bold text-green-300">96.7%</span>
              </span>
            </div>
            <div>
              <img
                src="/assets/sample-ml-graph.png"
                alt="Sample ML Graph"
                className="rounded-xl shadow-lg w-full max-w-xs mb-2"
              />
              <div className="text-xs text-white/40 mb-4">
                Sample performance graph (replace with real stats)
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="mt-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-green-500/20 transition duration-300"
            >
              Get Started / Login
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Homepage;