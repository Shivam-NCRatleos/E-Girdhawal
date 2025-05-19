import React from 'react';

const Header = ({ title, description }) => {
  return (
    <div className="text-center my-8">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      {description && <p className="text-lg text-white/80">{description}</p>}
    </div>
  );
};

export default Header;