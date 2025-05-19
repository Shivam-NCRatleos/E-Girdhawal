import React, { useState, useContext } from 'react';
import { AuthContext } from '../main';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';
import { createTicket } from '../services/tickets';

const FieldDataRequest = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fieldName: '',
    cropType: '',
    additionalInfo: '',
    supportingDocument: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "supportingDocument") {
      setFormData({ ...formData, supportingDocument: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Use FormData for file upload
    const data = new FormData();
    data.append('type', 'field_add');
    data.append('description',
      `Field Name: ${formData.fieldName}\nCrop Type: ${formData.cropType}\nAdditional Info: ${formData.additionalInfo}`
    );
    if (formData.supportingDocument) {
      data.append('images', formData.supportingDocument);
    }

    try {
      await createTicket(data, token, true);
      alert('Field data request submitted!');
      setFormData({
        fieldName: '',
        cropType: '',
        additionalInfo: '',
        supportingDocument: null,
      });
    } catch (err) {
      alert(err?.response?.data?.message || 'Error submitting field request');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header
        title="Field Data Request"
        description="Request to add field details for crop analysis. Fill in the required fields below."
      />
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
              onChange={handleChange}
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
          <SubmitButton label={loading ? "Submitting..." : "Submit Request"} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default FieldDataRequest;