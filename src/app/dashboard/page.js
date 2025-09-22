"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchUserData = async () => {
    try{
      const response = await fetch('/api/users');
      const data = await response.json();
      setUserData(data);
    }catch(error){
      console.log("Error fetching user data:", error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
  if (isLoaded && user) {
    fetchUserData();
  }
  }, [isLoaded, user]);

  const router = useRouter();
if (!isLoaded || loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  );
}


  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </SignOutButton>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Account Info</h3>
            <p className="text-gray-600 mb-2">Email: {user?.emailAddresses[0]?.emailAddress}</p>
           <p className="text-gray-600">
             Status: {userData?.hasAccess ? "Active" : "Expired"}
           </p>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Payment Gateway</h3>
            <button 
              onClick={() => router.push('/plans')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              View Plans
            </button>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-purple-700 p-6 rounded shadow-md text-white">
            <h3 className="text-xl font-semibold mb-4">🎬 Premium Content</h3>
            <p className="mb-4">Access exclusive shows and movies</p>
            <button 
              onClick={() => router.push('/welcome')}
              className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold w-full"
            >
              Welcome to Show
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Payment Gateway Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h4 className="font-semibold mb-2">Accept Payments</h4>
              <p className="text-gray-600 text-sm">Process credit cards, digital wallets, and bank transfers</p>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-semibold mb-2">Transaction History</h4>
              <p className="text-gray-600 text-sm">View and manage all your payment transactions</p>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-semibold mb-2">API Integration</h4>
              <p className="text-gray-600 text-sm">Integrate payments into your applications</p>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-semibold mb-2">Analytics</h4>
              <p className="text-gray-600 text-sm">Track performance and revenue insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}