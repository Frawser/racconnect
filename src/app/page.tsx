'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Racconnect AI Builder</h1>
        <p className="text-gray-400 text-lg">Describe your app idea below, and watch it come to life.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Build a portfolio with 3 projects and dark mode"
            className="w-full p-4 rounded-lg text-white text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Generate App
          </button>
        </form>
      </div>
    </main>
  );
}
