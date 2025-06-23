'use client';
import { useState } from 'react';

export default function PhotoCarousel({ urls }: { urls: string[] }) {
  const [index, setIndex] = useState(0);
  if (!urls.length) return null;

  function prev() {
    setIndex((i) => (i === 0 ? urls.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === urls.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative">
      <img src={urls[index]} alt="" className="w-full h-64 object-cover" />
      {urls.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <button
            onClick={prev}
            className="bg-white/70 hover:bg-white text-gray-800 rounded-full px-2"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="bg-white/70 hover:bg-white text-gray-800 rounded-full px-2"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
