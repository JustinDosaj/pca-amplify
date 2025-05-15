'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to templates page, which is our main dashboard view
    router.replace('/dashboard/templates');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-slate-500">Loading dashboard...</div>
    </div>
  );
};

export default DashboardPage; 