import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Outlet /> {/* Renders the nested route content */}
    </div>
  );
}

export default Dashboard;
