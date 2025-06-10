import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-white font-serif">
      <div className="text-center">
        <div className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}>
          <h1 className="text-9xl text-white font-bold">404</h1>
        </div>

        <div className="mt-[-50px]">
          <h3 className="text-4xl font-semibold">Look like you're lost</h3>
          <p className="text-lg text-gray-500">The page you are looking for is not available!</p>
          <Link to="/dashboard" className="mt-4 inline-block text-white bg-green-500 px-6 py-3 rounded-lg hover:bg-green-400 transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
