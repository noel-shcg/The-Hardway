'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ endpoint, label }: { endpoint: string; label: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    const response = await fetch(endpoint, { method: 'DELETE' });
    if (!response.ok) {
      alert('You must be logged in to delete this item.');
      return;
    }
    router.push(endpoint.startsWith('/api/blog') ? '/blog' : '/fleet');
    router.refresh();
  };
  return <button type="button" onClick={handleDelete} className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center">Delete {label}</button>;
}
