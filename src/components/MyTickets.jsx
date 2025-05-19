import React, { useEffect, useState } from 'react';
import { getMyTickets } from '../api/tickets';

const MyTickets = ({ token }) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    getMyTickets(token).then(res => setTickets(res.data));
  }, [token]);
  return (
    <div>
      <h2>My Tickets</h2>
      <table>
        <thead>
          <tr><th>Type</th><th>Status</th><th>Description</th><th>Date</th></tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id}>
              <td>{t.type}</td>
              <td>{t.status}</td>
              <td>{t.description}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTickets;