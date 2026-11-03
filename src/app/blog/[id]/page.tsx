import { getBlogPostById, getVehicles } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id);
  const vehicles = getVehicles();

  if (!post) {
    notFound();
  }

  const linkedVehicle = post.linkedVehicleId 
    ? vehicles.find(v => v.id === post.linkedVehicleId)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        href="/blog"
        className="text-navy-light hover:text-navy transition-colors mb-6 inline-block"
      >
        ← Back to Blog
      </Link>

      {post.headerImage && (
        <img
          src={post.headerImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-4xl font-bold text-navy mb-4">{post.title}</h1>
      <p className="text-lg text-navy-light mb-8">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {linkedVehicle && (
        <div className="bg-cream-dark p-4 rounded-lg mb-8">
          <p className="text-navy">
            Related Vehicle:{' '}
            <Link 
              href={`/fleet/${linkedVehicle.id}`}
              className="text-navy-light hover:text-navy font-medium"
            >
              {linkedVehicle.fleetNumber} - {linkedVehicle.registration}
            </Link>
          </p>
        </div>
      )}

      <div className="prose prose-lg max-w-none text-navy mb-8">
        <div className="whitespace-pre-wrap">{post.body}</div>
      </div>

      {post.photoAlbum && post.photoAlbum.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Photo Album</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.photoAlbum.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link 
          href={`/blog/${post.id}/edit`}
          className="bg-navy text-cream px-6 py-2 rounded-lg hover:bg-navy-light transition-colors"
        >
          Edit Post
        </Link>
      </div>
    </div>
  );
}
