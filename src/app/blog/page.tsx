import { getBlogPosts } from '@/lib/data';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';

export default async function BlogList() {
  const blogPosts = getBlogPosts();
  const authenticated = await isAuthenticated();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-navy">Blog Posts</h1>
        {authenticated && <Link
          href="/blog/create"
          className="bg-navy text-cream px-6 py-2 rounded-lg hover:bg-navy-light transition-colors"
        >
          Create New Post
        </Link>}
      </div>

      {blogPosts.length === 0 ? (
        <div className="bg-cream-dark p-8 rounded-lg text-center">
          <p className="text-navy text-lg mb-4">No blog posts yet.</p>
          <Link 
            href="/blog/create"
            className="text-navy-light hover:text-navy transition-colors font-medium"
          >
            Create your first blog post →
          </Link>
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
                <div className="flex flex-wrap gap-1 mb-2">
                  {(post.categories || []).map((category) => <span key={category} className="text-xs bg-navy-light text-cream px-2 py-1 rounded-full">{category}</span>)}
                  {post.featured && <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">Featured</span>}
                </div>
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
    </div>
  );
}
