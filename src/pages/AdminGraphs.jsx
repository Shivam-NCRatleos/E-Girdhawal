import React from 'react';
import Header from '../components/Header';

const AdminGraphs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header title="Graphs & Matrices" description="Analyze platform metrics and user activities." />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Ticket Status Distribution</h3>
          <img src="/path/to/ticket-status-graph.jpg" alt="Ticket Status Graph" className="w-full" />
        </div>
        <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">User Dispute Occurrences</h3>
          <img src="/path/to/dispute-graph.jpg" alt="Dispute Graph" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AdminGraphs;