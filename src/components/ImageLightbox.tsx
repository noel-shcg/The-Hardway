'use client';

import { useState } from 'react';

export default function ImageLightbox({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  if (!images.length) return null;

  const close = () => setActive(null);
  const move = (offset: number) => {
    if (active === null) return;
    setActive((active + offset + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => setActive(index)} className="text-left">
            <img src={image} alt={`Photo ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={close}>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-4 text-white text-4xl" aria-label="Previous image">‹</button>
          <img src={images[active]} alt={`Photo ${active + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} />
          <button type="button" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-4 text-white text-4xl" aria-label="Next image">›</button>
          <button type="button" onClick={close} className="absolute top-4 right-6 text-white text-3xl" aria-label="Close lightbox">×</button>
        </div>
      )}
    </>
  );
}
