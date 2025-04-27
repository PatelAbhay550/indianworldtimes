import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  FaSearch, 
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaBookmark
} from 'react-icons/fa';
import Link from 'next/link';

const formatCategoryName = (cat) => {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

const CategoryPage = async ({ params }) => {
  const category = await params.name;
  
  // Fetch data directly in server component
  const newsCollection = collection(db, 'news');
  const q = query(newsCollection, where('category', '==', category));
  const querySnapshot = await getDocs(q);
  
  const news = [];
  querySnapshot.forEach((doc) => {
    news.push({ id: doc.id, ...doc.data() });
  });

  // Sort by publishedAt (newest first)
  news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center hover:text-gray-300">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <span className="text-sm">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-red-600 px-3 py-1 text-sm rounded">Subscribe</button>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 py-4 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-serif font-bold text-red-600">
              {formatCategoryName(category)} News
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Latest {formatCategoryName(category)} stories from around the world
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Featured Story (first article) */}
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
                  <span className="text-red-600 font-medium uppercase text-sm">
                    Featured {formatCategoryName(category)} Story
                  </span>
                  <h2 className="text-3xl font-bold mt-2 mb-4 font-serif">
                    {news[0].title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {news[0].summary}
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <FaUser className="mr-1" />
                    <span>{news[0].author || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt className="mr-1" />
                    <span>{formatDate(news[0].publishedAt)}</span>
                  </div>
                  <Link 
                    href={`/news/${news[0].id}`}
                    className="mt-4 inline-flex items-center text-red-600 font-medium hover:underline"
                  >
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest News */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700 font-serif">
            Latest {formatCategoryName(category)} News
          </h2>
          
          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No news articles found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(1).map((article) => (
                <article 
                  key={article.id} 
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700"
                >
                  <img
                    src={article.imageUrl || '/placeholder-news.jpg'}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    
                  />
                  <div className="p-4">
                    <span className="text-xs uppercase text-red-600 font-medium">
                      {formatCategoryName(article.category)}
                    </span>
                    <h3 className="text-xl font-bold mt-1 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <Link 
                        href={`/news/${article.id}`}
                        className="text-red-600 hover:underline flex items-center"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Indian World Times. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;