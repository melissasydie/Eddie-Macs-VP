import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-md w-full bg-stone-900 border border-stone-800 p-8 text-center shadow-2xl relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 w-12 h-12 flex items-center justify-center rotate-3 border-2 border-stone-950">
          <Utensils className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider text-white mt-4 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>Eddie Macs @ VP</h1>
        <h2 className="text-xl font-bold text-red-500 mb-8 uppercase tracking-widest">Admin Access</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 px-6 transition-colors shadow-[4px_4px_0_0_#fff]"
        >
          Sign in with Google
        </button>
        
        <p className="mt-8 text-stone-500 text-sm">Authorized personnel only.</p>
      </div>
    </div>
  );
}
