import React, { useEffect, useState } from 'react';
import { getAllTickets, updateTicketStatus } from '../api/tickets';

const AdminTickets = ({ token }) => {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    getAllTickets(token, status ? { status } : {}).then(res => setTickets(res.data));
  }, [token, status]);
  const handleStatusChange = (id, newStatus) => {
    updateTicketStatus(id, { status: newStatus }, token).then(() => {
      setTickets(tickets => tickets.map(t => t._id === id ? { ...t, status: newStatus } : t));
    });
  };
  return (
    <div>
      <h2>All Tickets</h2>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="compensated">Compensated</option>
      </select>
      <table>
        <thead>
          <tr><th>User</th><th>Type</th><th>Status</th><th>Description</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id}>
              <td>{t.user?.name || t.user}</td>
              <td>{t.type}</td>
              <td>{t.status}</td>
              <td>{t.description}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
              <td>
                <select value={t.status} onChange={e => handleStatusChange(t._id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="compensated">Compensated</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTickets;