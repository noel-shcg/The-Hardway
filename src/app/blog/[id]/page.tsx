import { getBlogPostById, getVehicles } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import ImageLightbox from '@/components/ImageLightbox';
import DeleteButton from '@/components/DeleteButton';

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id);
  const vehicles = getVehicles();

  if (!post) {
    notFound();
  }

  const authenticated = await isAuthenticated();
  const relatedVehicles = vehicles.filter(v => (post.relatedVehicleIds || [post.linkedVehicleId]).includes(v.id));

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
      <div className="flex flex-wrap gap-2 mb-4">
        {(post.categories || []).map((category) => <span key={category} className="bg-navy-light text-cream px-3 py-1 rounded-full text-sm">{category}</span>)}
        {(post.tags || []).map((tag) => <span key={tag} className="bg-cream-dark text-navy px-3 py-1 rounded-full text-sm">#{tag}</span>)}
      </div>
      <p className="text-lg text-navy-light mb-8">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {relatedVehicles.length > 0 && (
        <div className="bg-cream-dark p-4 rounded-lg mb-8">
          <p className="text-navy font-medium mb-2">Related Vehicles</p>
          <div className="flex flex-wrap gap-3">{relatedVehicles.map((vehicle) => <Link key={vehicle.id} href={`/fleet/${vehicle.id}`} className="text-navy-light hover:text-navy font-medium">{vehicle.fleetNumber} - {vehicle.registration}</Link>)}</div>
        </div>
      )}

      <div className="prose prose-lg max-w-none text-navy mb-8">
        <div className="whitespace-pre-wrap">{post.body}</div>
      </div>

      {post.photoAlbum && post.photoAlbum.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Photo Album</h2>
          <ImageLightbox images={post.photoAlbum} />
        </div>
      )}

      {authenticated && <div className="mt-8 flex gap-4">
        <Link 
          href={`/blog/${post.id}/edit`}
          className="bg-navy text-cream px-6 py-2 rounded-lg hover:bg-navy-light transition-colors"
        >
          Edit Post
        </Link>
        <DeleteButton endpoint={`/api/blog/${post.id}`} label="post" />
      </div>}
    </div>
  );
}
