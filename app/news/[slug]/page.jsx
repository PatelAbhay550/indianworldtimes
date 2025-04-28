import Footersmall from '@/components/Footersmall';
import NewspageTopbar from '@/components/NewspageTopbar';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowLeft, 
  FaShareAlt, 
  FaBookmark 
} from 'react-icons/fa';
export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params;
 
  // fetch data
  // Query Firestore for article matching slug
  const q = query(
    collection(db, 'news'),
    where('slug', '==', slug)
  );
  const querySnapshot = await getDocs(q);
  const article = {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };
 
  return {
    title: article.title || 'News Article',
    description: article.summary || 'Read the latest news article.',
    keywords: article.keywords || 'news, article, latest',
    authors: article.author || 'Indian World Times',
    openGraph: {
      title: article.title || 'News Article',
      description: article.summary || 'Read the latest news article.',
      images: [article.imageUrl || 'https://example.com/default-image.jpg'],
      url: `https://indianworldtimes.com/news/${slug}`,

    },
  }
}
 

export default async function NewsArticle({ params }) {
  const { slug } = await params;

  // Query Firestore for article matching slug
  const q = query(
    collection(db, 'news'),
    where('slug', '==', slug)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The news article you're looking for doesn't exist.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center text-red-600 hover:underline"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const article = {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      
      {/* Topbar */}
      <NewspageTopbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <article>
          {/* Category + Title */}
          <header className="mb-6">
            <span className="text-red-600 font-semibold uppercase text-sm">
              {article.category || 'General'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 font-serif">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm gap-4">
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>{article.author || 'Abhay'}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{formatDate(article.publishedAt.toDate())}</span>
              </div>
              {article.source && (
                <div>Source: <span className="font-medium">{article.source}</span></div>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {article.imageUrl && (
            <figure className="mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-auto rounded-lg"
                
              />
            </figure>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

        </article>
      </main>

      {/* Footer */}
     <Footersmall />
    </div>
  );
}
