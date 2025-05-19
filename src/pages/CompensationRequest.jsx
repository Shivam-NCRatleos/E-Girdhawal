import React, { useState, useContext } from 'react';
import { AuthContext } from '../main';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import TextArea from '../components/TextArea';
import SubmitButton from '../components/SubmitButton';
import { createTicket } from '../services/tickets';

const CompensationRequest = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    cropDetails: '',
    problemsFaced: '',
    proposedAmount: '',
    comments: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTicket(
        {
          type: 'compensation',
          description: `${formData.cropDetails}\nProblems: ${formData.problemsFaced}\nComments: ${formData.comments}`,
          requestedAmount: Number(formData.proposedAmount),
        },
        token
      );
      alert('Compensation request submitted!');
      setFormData({
        cropDetails: '',
        problemsFaced: '',
        proposedAmount: '',
        comments: '',
      });
    } catch (err) {
      alert(err?.response?.data?.message || 'Error submitting request');
    }
    setLoading(false);
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
          <SubmitButton label={loading ? "Submitting..." : "Submit Request"} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default CompensationRequest;