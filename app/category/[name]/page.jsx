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
import TopbarHome from '@/components/TopbarHome';
import FeaturedNews from '@/components/FeaturedNews';
import NewsBox from '@/components/NewsBox';
export async function generateMetadata({ params }) {
  const category = await params.name;
  return {
    title: `Latest News and Updates in ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    description: `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} news articles. Read Now`,
    openGraph: {
      title: `Latest News and Updates in ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      description: `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} news articles. Read now`,
      images: [`https://placehold.co/600x400?text=${encodeURIComponent(`${category.charAt(0).toUpperCase() + category.slice(1)}+Category+News+Indian+World+Times`)}`],
      url: `https://indianworldnews.com/category/${encodeURIComponent(category)}`,
    },
  };
}

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
     <TopbarHome />

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
         <FeaturedNews news={news} />
        )}

        {/* Latest News */}
       <NewsBox news={news} />
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