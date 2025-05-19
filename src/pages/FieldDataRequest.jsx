import React, { useState } from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';

const FieldDataRequest = () => {
  const [formData, setFormData] = useState({
    fieldName: '',
    cropType: '',
    supportingDocument: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Field Data Request Submitted:', formData);
    // Add API call or backend integration here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header
        title="Field Data Request"
        description="Request to add field details for crop analysis. Fill in the required fields below."
      />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Field Name"
            name="fieldName"
            placeholder="Enter the field name"
            value={formData.fieldName}
            onChange={handleChange}
          />
          <FormInput
            label="Crop Type"
            name="cropType"
            placeholder="Enter the type of crop"
            value={formData.cropType}
            onChange={handleChange}
          />
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Upload Supporting Document
            </label>
            <input
              type="file"
              name="supportingDocument"
              onChange={(e) =>
                setFormData({ ...formData, supportingDocument: e.target.files[0] })
              }
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 
              focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <TextArea
            label="Additional Information"
            name="additionalInfo"
            placeholder="Provide additional details about the field"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          <SubmitButton label="Submit Request" />
        </form>
      </div>
    </div>
  );
};

export default FieldDataRequest;