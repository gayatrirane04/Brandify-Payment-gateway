"use client";
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Welcome() {
    const [userData , setUserData] = useState(null);
const [loading,setLoading] = useState(true);

const fetchUserData = async() => {
    try{
       const response = await fetch('/api/users');
       const data = await response.json();
       setUserData(data);
    }catch(error){
        console.error('Error:',error);
    }finally{
           setLoading(false);
        }
}

useEffect(() => {
   fetchUserData();
},[]);
  const router = useRouter();
  const { user } = useUser();

  const genres = [
    { name: "Action", image: "🎬", color: "bg-red-600" },
    { name: "Comedy", image: "😂", color: "bg-yellow-500" },
    { name: "Drama", image: "🎭", color: "bg-purple-600" },
    { name: "Thriller", image: "🔥", color: "bg-orange-600" },
    { name: "Romance", image: "💕", color: "bg-pink-500" },
    { name: "Sci-Fi", image: "🚀", color: "bg-blue-600" }
  ];
  
  
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>Loading...</div>
    </div>
  );
}


  if (!userData?.hasAccess) {
    return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">OOPS! 🚫</h1>
        <p className="text-xl mb-6">Your access has expired</p>
        <button 
          onClick={() => router.push('/plans')}
          className="bg-red-600 px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Subscribe Now
        </button>
      </div>
    </div>
    );
   }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-purple-700 p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Brandifyy Show</h1>
        <p className="text-xl opacity-90">Hey {user?.firstName}, ready for unlimited entertainment?</p>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black p-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Your Premium Access Awaits</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
          Dive into exclusive content, trending shows, and personalized recommendations just for you.
        </p>
        
        <button
          onClick={() => router.push('/show')}
          className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105"
        >
          🎬 Enter The Show
        </button>
      </div>

      {/* Genres Grid */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-6">Explore Genres</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`${genre.color} p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform`}
            >
              <div className="text-3xl mb-2">{genre.image}</div>
              <div className="font-semibold">{genre.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-8 bg-gray-900">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-xl font-semibold mb-2">Watch Anywhere</h4>
            <p className="opacity-80">Stream on all your devices</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⬇️</div>
            <h4 className="text-xl font-semibold mb-2">Download & Go</h4>
            <p className="opacity-80">Watch offline anytime</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h4 className="text-xl font-semibold mb-2">Multiple Profiles</h4>
            <p className="opacity-80">Create profiles for family</p>
          </div>
        </div>
      </div>
    </div>
  );
}

