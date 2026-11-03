'use client';

import { useRef, useState } from 'react';
import { ImageMetadata } from '@/types';

export default function BulkImageUpload({ onUploaded, folder = 'vehicles' }: {
  onUploaded: (images: ImageMetadata[]) => void;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const upload = async (files: FileList | File[]) => {
    setUploading(true);
    try {
      const results = await Promise.all(Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return { url: data.url } satisfies ImageMetadata;
      }));
      onUploaded(results);
    } catch {
      alert('One or more images could not be uploaded. Please log in and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${dragging ? 'border-navy bg-cream-dark' : 'border-navy-light'}`}
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => { event.preventDefault(); setDragging(false); if (event.dataTransfer.files.length) upload(event.dataTransfer.files); }}
    >
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(event) => { if (event.target.files) upload(event.target.files); }} />
      <button type="button" onClick={() => inputRef.current?.click()} className="text-navy font-medium" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Click or drag images here'}
      </button>
      <p className="text-sm text-navy-light mt-1">Select multiple images at once.</p>
    </div>
  );
}
