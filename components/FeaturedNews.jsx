import Link from 'next/link'
import React from 'react'

const FeaturedNews = ({news}) => {
    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) return 'Date not available';
        const date = timestamp.toDate();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
      };
  return (
    <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <img
                    src={news[0].imageUrl || `https://placehold.co/600x400?text=${news[0].title}`}
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
  )
}

export default FeaturedNews