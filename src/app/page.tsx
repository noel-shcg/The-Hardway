import { getBlogPosts } from '@/lib/data';
import RotatingBanner from '@/components/RotatingBanner';
import Link from 'next/link';

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 3);
  
  const bannerImages = [
    'https://via.placeholder.com/1200x400/1E3A8A/FFFDD0?text=Banner+1',
    'https://via.placeholder.com/1200x400/2563EB/FFFDD0?text=Banner+2',
    'https://via.placeholder.com/1200x400/1E3A8A/FFFDD0?text=Banner+3',
    'https://via.placeholder.com/1200x400/2563EB/FFFDD0?text=Banner+4',
    'https://via.placeholder.com/1200x400/1E3A8A/FFFDD0?text=Banner+5',
    'https://via.placeholder.com/1200x400/2563EB/FFFDD0?text=Banner+6',
    'https://via.placeholder.com/1200x400/1E3A8A/FFFDD0?text=Banner+7',
    'https://via.placeholder.com/1200x400/2563EB/FFFDD0?text=Banner+8',
    'https://via.placeholder.com/1200x400/1E3A8A/FFFDD0?text=Banner+9',
    'https://via.placeholder.com/1200x400/2563EB/FFFDD0?text=Banner+10',
  ];

  return (
    <div className="min-h-full bg-cream">
      <RotatingBanner images={bannerImages} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Welcome to The Hardway</h1>
          <p className="text-lg text-navy-light">
            Exploring the world of buses, one vehicle at a time. Run by Noel Hands.
          </p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-navy">Recent Blog Posts</h2>
            <Link 
              href="/blog" 
              className="text-navy-light hover:text-navy transition-colors font-medium"
            >
              View All →
            </Link>
          </div>
          
          {blogPosts.length === 0 ? (
            <div className="bg-cream-dark p-8 rounded-lg text-center">
              <p className="text-navy text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.headerImage && (
                    <img
                      src={post.headerImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-navy mb-2">{post.title}</h3>
                    <p className="text-sm text-navy-light mb-2">
                      By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-navy line-clamp-3">
                      {post.body.substring(0, 150)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
