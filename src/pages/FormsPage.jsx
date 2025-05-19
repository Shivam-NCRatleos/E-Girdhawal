import React, { useState } from 'react';
import CompensationRequest from './CompensationRequest';
import FieldDataRequest from './FieldDataRequest';
import DisputeForm from './DisputeForm';

const FormsPage = () => {
  // Set the default to "fielddata" so FieldDataRequest opens by default
  const [selectedForm, setSelectedForm] = useState('fielddata');

  // Helper to render the selected form
  const renderForm = () => {
    switch (selectedForm) {
      case 'compensation':
        return <CompensationRequest />;
      case 'fielddata':
        return <FieldDataRequest />;
      case 'dispute':
        return <DisputeForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Select a Form</h2>
        <select
          value={selectedForm}
          onChange={e => setSelectedForm(e.target.value)}
          className="block w-full mb-8 px-4 py-2 rounded-lg bg-gray-800 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="fielddata">Field Data Request</option>
          <option value="compensation">Compensation Request</option>
          <option value="dispute">Dispute Form</option>
        </select>
        {renderForm()}
      </div>
    </div>
  );
};

export default FormsPage;