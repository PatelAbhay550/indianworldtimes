import Link from 'next/link'
import React from 'react'

const NewsBox = ({news}) => {
    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) return 'Date not available';
        const date = timestamp.toDate();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
      };
  return (
    <section>
    <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700 font-serif">Latest News</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.slice(1).map((article) => (
        <article key={article.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700">
          <img
            src={article.imageUrl || `https://placehold.co/600x400?text=${article.title}`}
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
  )
}

export default NewsBox