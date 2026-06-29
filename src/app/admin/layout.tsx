"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 text-white font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-neutral-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-6 text-velocity-red">
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-widest">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-velocity-red transition-colors mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4 text-center">Incorrect password.</p>}
          <button type="submit" className="w-full py-3 bg-velocity-red text-white font-bold uppercase tracking-wider rounded-lg hover:bg-red-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans p-6 md:p-12 relative z-10">
      <div className="max-w-7xl mx-auto bg-neutral-950">
        <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Velocity-X Admin</h1>
            <p className="text-gray-400 mt-2">Manage your contacts and showroom gallery.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-400 hover:text-white transition-colors">Logout</button>
        </header>
        {children}
      </div>
    </div>
  );
}
