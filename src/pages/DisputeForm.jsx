import React, { useState } from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const DisputeForm = () => {
  const [formData, setFormData] = useState({
    recentImage: '/path/to/recent-image.jpg',
    expectedPrediction: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dispute Form Submitted:', formData);
    // Add API call or backend integration here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header
        title="Raise a Dispute"
        description="Disagree with the ML model's prediction? Provide details below to create a dispute ticket."
      />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Image</h3>
          <img
            src={formData.recentImage}
            alt="Most Recent Upload"
            className="w-full rounded-lg border border-white/10"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Expected Prediction"
            name="expectedPrediction"
            placeholder="What do you think should be predicted?"
            value={formData.expectedPrediction}
            onChange={handleChange}
          />
          <TextArea
            label="Comments"
            name="comment"
            placeholder="Provide additional details or reasoning for your dispute"
            value={formData.comment}
            onChange={handleChange}
          />
          <SubmitButton label="Submit Dispute" />
        </form>
      </div>
    </div>
  );
};

export default DisputeForm;