"use client";
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaTrash } from 'react-icons/fa';

const DeleteNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsCollection = collection(db, 'news');
                const newsSnapshot = await getDocs(newsCollection);
                const newsData = newsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNewsList(newsData);
            } catch (error) {
                setMessage('Error fetching news: ' + error.message);
            }
        };

        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this news?');
        if (!confirmed) return;

        setLoading(true);
        try {
            const newsRef = doc(db, 'news', id);
            await deleteDoc(newsRef);
            setNewsList(newsList.filter(news => news.id !== id));
            setMessage('News deleted successfully!');
        } catch (error) {
            setMessage('Error deleting news: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage News</h1>
            {message && <p className="mb-4">{message}</p>}
            <ul>
                {newsList.map(news => (
                    <li key={news.id} className="flex justify-between items-center border-b p-2">
                        <span>{news.title || 'Untitled News'}</span>
                        <button
                            onClick={() => handleDelete(news.id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={loading}
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteNews;