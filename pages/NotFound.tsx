import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.tsx';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <h1 className="text-6xl font-bold text-kompa-gold-500">404</h1>
            <p className="text-2xl mt-4 text-gray-800">Page Not Found</p>
            <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-8">
                <Button>Go Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;