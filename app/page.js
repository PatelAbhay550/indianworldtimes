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
import Footerhome from '@/components/Footerhome';
import Newsletter from '@/components/Newsletter';
import Headerhome from '@/components/Headerhome';
import TopbarHome from '@/components/TopbarHome';
import { Categories } from '@/lib/categories';
import FeaturedNews from '@/components/FeaturedNews';
import NewsBox from '@/components/NewsBox';

const categories = Categories
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
        <TopbarHome />

        {/* Header */}
       <Headerhome />

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
            <FeaturedNews news={news} />
          )}

          {/* Latest News */}
         <NewsBox news={news} />
        </main>

        {/* Newsletter */}
       <Newsletter />

        {/* Footer */}
        <Footerhome />
      </div>
    </div>
  );
}