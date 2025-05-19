import React, { useState } from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const CompensationRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cropDetails: '',
    problemsFaced: '',
    proposedAmount: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add API call or backend integration here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header
        title="Compensation Request"
        description="Request compensation for your crops. Please fill in the details below."
      />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextArea
            label="Crop Details"
            name="cropDetails"
            placeholder="Describe the crop you are requesting compensation for"
            value={formData.cropDetails}
            onChange={handleChange}
          />
          <TextArea
            label="Problems Faced"
            name="problemsFaced"
            placeholder="Describe the problems you faced"
            value={formData.problemsFaced}
            onChange={handleChange}
          />
          <FormInput
            label="Proposed Amount"
            name="proposedAmount"
            type="number"
            placeholder="Enter the amount you are requesting"
            value={formData.proposedAmount}
            onChange={handleChange}
          />
          <TextArea
            label="Additional Comments"
            name="comments"
            placeholder="Provide any additional information"
            value={formData.comments}
            onChange={handleChange}
          />
          <SubmitButton label="Submit Request" />
        </form>
      </div>
    </div>
  );
};

export default CompensationRequest;