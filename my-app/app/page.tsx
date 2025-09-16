import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl lg:text-8xl flex items-center justify-center">
          Hi!
          <span className="ml-4 text-8xl waving-hand" role="img" aria-label="waving hand">
            👋
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 sm:mt-6 sm:text-xl">
          Welcome to my admin dashboard
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="rounded-full px-8 py-3 text-base font-medium">
            <Link href="/dashboard">
              Click to see it
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;