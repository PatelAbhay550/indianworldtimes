"use client";
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { 
  FaNewspaper,
  FaImage,
  FaUserEdit,
  FaTag,
  FaLink,
  FaBuilding,
  FaCalendarAlt,
  FaArrowLeft,
  FaSave
} from 'react-icons/fa';

const categories = [
  { id: 'general', name: 'General' },
  { id: 'business', name: 'Business' },
  {id:'war', name: 'War'},
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

export default function AddNewsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '<p></p>',
    author: '',
    category: 'general',
    imageUrl: '',
    source: '',
    slug: '',
    publishedAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title || !formData.summary || !formData.content) {
        throw new Error('Title, summary, and content are required');
      }

      await addDoc(collection(db, 'news'), {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString()
      });

      setSuccess('News article added successfully!');
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      console.error('Error adding news:', err);
      setError(err.message || 'Failed to add news article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Header matching your main page */}
      <header className="border-b border-gray-200 dark:border-gray-700 py-4 px-4 md:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-serif font-bold text-red-600 flex items-center">
            <FaNewspaper className="mr-2" />
            Add News Article
          </h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Article Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                placeholder="Enter news headline"
                required
              />
            </div>

            {/* Image URL Field */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <label className="flex items-center text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                <FaImage className="mr-2 text-red-600" />
                Featured Image URL
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <FaLink />
                </span>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Image Preview:</p>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="h-40 object-cover rounded border border-gray-200 dark:border-gray-600"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            {/* Summary Field */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Short Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                placeholder="Brief summary that will appear in news listings"
                required
              />
            </div>

            {/* Content Field */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Full Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 font-mono"
                placeholder="<p>Enter the full article content with HTML formatting</p>"
                required
              />
            </div>

            {/* Author, Category, Source, Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Author */}
              <div>
                <label className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <FaUserEdit className="mr-2 text-red-600" />
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  placeholder="Reporter's name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <FaTag className="mr-2 text-red-600" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <FaBuilding className="mr-2 text-red-600" />
                  Source
                </label>
                
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  placeholder="News organization"
                />
              </div>
              {/* Slug */}
              <div>
                <label className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <FaLink className="mr-2 text-red-600" />
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  placeholder="news/article-title"
                />
              </div>

              {/* Publish Date */}
              <div>
                <label className="flex items-center text-gray-800 dark:text-gray-200 mb-1">
                  <FaCalendarAlt className="mr-2 text-red-600" />
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center px-6 py-3 rounded-md text-white ${isSubmitting ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full md:w-auto`}
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}