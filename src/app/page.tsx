import { getBlogPosts, getVehicles } from '@/lib/data';
import RotatingBanner from '@/components/RotatingBanner';
import Link from 'next/link';

export default function Home() {
  const blogPosts = getBlogPosts().slice(0, 3);
  const vehicles = getVehicles();
  const featuredVehicles = vehicles.filter((vehicle) => vehicle.featured).slice(0, 4);
  const recentVehicles = [...vehicles].slice(-3).reverse();
  
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

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-navy mb-4">Featured Vehicles</h2>
            {featuredVehicles.length === 0 ? (
              <p className="bg-cream-dark p-6 rounded-lg text-navy">No featured vehicles yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredVehicles.map((vehicle) => (
                  <Link key={vehicle.id} href={`/fleet/${vehicle.id}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
                    <p className="font-bold text-navy">{vehicle.fleetNumber} - {vehicle.registration}</p>
                    <p className="text-navy-light">{vehicle.vehicleType} · {vehicle.livery}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <aside className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-bold text-navy mb-4">Recent Activity</h2>
            <h3 className="font-medium text-navy">Vehicles</h3>
            <ul className="text-sm text-navy-light mb-4">{recentVehicles.map((vehicle) => <li key={vehicle.id}><Link href={`/fleet/${vehicle.id}`} className="hover:text-navy">{vehicle.fleetNumber} - {vehicle.registration}</Link></li>)}</ul>
            <h3 className="font-medium text-navy">Blog posts</h3>
            <ul className="text-sm text-navy-light">{getBlogPosts().slice(0, 3).map((post) => <li key={post.id}><Link href={`/blog/${post.id}`} className="hover:text-navy">{post.title}</Link></li>)}</ul>
          </aside>
        </section>
      </div>
    </div>
  );
}
