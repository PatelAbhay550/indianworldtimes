import { 
  FaSearch, 
  FaBars, 
  FaUser, 
  FaSun, 
  FaMoon, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube,
  FaEnvelope,
  FaArrowLeft
} from 'react-icons/fa';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';

const categories = [
  { id: 'general', name: 'General' },
  { id: 'business', name: 'Business' },
  { id: 'war', name: 'War' },
  { id: 'world', name: 'World' },
  { id: 'politics', name: 'Politics' },
  { id: 'local', name: 'Local' },
  { id: 'national', name: 'National' },
  { id: 'international', name: 'International' },
  { id: 'opinion', name: 'Opinion' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' }
];

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return 'Date not available';
  const date = timestamp.toDate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

export default async function IndianWorldTimes({ searchParams }) {
  const activeCategory = searchParams.category || 'general';
  
  // Fetch news from Firestore
  const newsCollection = collection(db, 'news');
  let q;
  if (activeCategory === 'general') {
    q = query(newsCollection);
  } else {
    q = query(newsCollection, where('category', '==', activeCategory));
  }
  
  const querySnapshot = await getDocs(q);
  const news = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <div className="min-h-screen">
      <div className="dark:bg-gray-900 dark:text-white">
        {/* Top Bar */}
        <div className="bg-black text-white py-2 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="md:hidden">
              <FaBars />
            </button>
            <span className="text-sm">Today: {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1">
              <FaUser />
            </button>
            <button className="bg-red-600 px-3 py-1 text-sm rounded">Subscribe</button>
          </div>
        </div>

        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 py-4 px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-4xl font-serif font-bold text-red-600">Indian World Times</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bringing you the truth since 2023</p>
            </div>
            <div className="relative w-full md:w-1/3">
              <form action="/search" method="GET">
                <input
                  type="text"
                  name="q"
                  placeholder="Search news..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </form>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto scrollbar-hide px-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className={`px-4 py-3 whitespace-nowrap font-medium text-sm ${activeCategory === category.id ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Featured Story */}
          {news.length > 0 && (
            <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <img
                    src={news[0].imageUrl || '/placeholder-news.jpg'}
                    alt={news[0].title}
                    className="w-full h-96 object-cover rounded-lg"
                    
                  />
                </div>
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div>
                    <span className="text-red-600 font-medium uppercase text-sm">Featured Story</span>
                    <h2 className="text-3xl font-bold mt-2 mb-4 font-serif">{news[0].title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{news[0].summary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      By {news[0].author || 'Unknown'} • {formatDate(news[0].publishedAt)}
                    </p>
                    <Link href={`/news/${news[0].slug}`} className="mt-4 text-red-600 font-medium hover:underline">
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Latest News */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700 font-serif">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(1).map((article) => (
                <article key={article.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700">
                  <img
                    src={article.imageUrl || '/placeholder-news.jpg'}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                   
                  />
                  <div className="p-4">
                    <Link href={`/category/${article.category}`} className="text-xs uppercase text-red-600 font-medium">
                      {article.category || activeCategory}
                    </Link>
                    <h3 className="text-xl font-bold mt-1 mb-2">{article.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{formatDate(article.publishedAt)}</span>
                      <Link href={`/news/${article.slug}`} className="text-red-600 hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Newsletter */}
        <section className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold mb-4 font-serif">Stay Informed</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Subscribe to our newsletter for daily updates delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="flex-grow max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                required
              />
              <button 
                type="submit" 
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Indian World Times</h3>
                <p className="text-gray-400">
                  Bringing you accurate and timely news from India and around the world.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Sections</h4>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/category/${category.id}`} className="text-gray-400 hover:text-white">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                  <li><Link href="/advertise" className="text-gray-400 hover:text-white">Advertise</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact Us</h4>
                <address className="text-gray-400 not-italic">
                  <p>123 News Street</p>
                  <p>New Delhi, India 110001</p>
                  <p className="mt-2 flex items-center">
                    <FaEnvelope className="mr-2" /> contact@indianworldtimes.com
                  </p>
                </address>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Indian World Times. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}