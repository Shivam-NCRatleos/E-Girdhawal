import React, { useState } from 'react';
import Header from '../components/Header';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      user: 'John Doe',
      type: 'Compensation',
      status: 'Pending',
      date: '2025-05-10',
    },
    {
      id: 2,
      user: 'Jane Smith',
      type: 'Dispute',
      status: 'Approved',
      date: '2025-05-12',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-6 text-white">
      <Header title="Manage Tickets" description="View and update the status of user tickets." />
      <div className="max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-white/80 py-2">User</th>
              <th className="text-white/80 py-2">Ticket Type</th>
              <th className="text-white/80 py-2">Status</th>
              <th className="text-white/80 py-2">Date</th>
              <th className="text-white/80 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="text-white/80 py-2">{ticket.user}</td>
                <td className="text-white/80 py-2">{ticket.type}</td>
                <td className="text-white/80 py-2">{ticket.status}</td>
                <td className="text-white/80 py-2">{ticket.date}</td>
                <td className="py-2">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Compensated">Compensated</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTickets;