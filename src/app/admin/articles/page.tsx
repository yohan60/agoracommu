'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const AdminArticlesPage = () => {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Vérification si l'utilisateur est admin
  useEffect(() => {
    if (session?.user?.roles !== 'Admin') {
      // Si l'utilisateur n'est pas admin, redirige-le vers la page d'accueil
      window.location.href = '/';
    }
  }, [session]);

  // Récupérer les articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/admin/articles');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles');
        }
        const data = await response.json();

        // Trier les articles du plus ancien au plus récent
        data.sort(
          (
            a: { created_at: string | number | Date },
            b: { created_at: string | number | Date }
          ) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        setArticles(data);
      } catch (error) {
        console.error(error);
        setError('Erreur lors de la récupération des articles');
      }
    };

    fetchArticles();
  }, []);

  // Supprimer un article
  const deleteArticle = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la suppression de l'article: ${response.statusText}`
        );
      }

      // Supprimer l'article de la liste côté client après la suppression
      setArticles(articles.filter((article) => article.id_article !== id));
    } catch (error) {
      console.error('Erreur de suppression d&apos;article :', error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center overflow-y-auto pt-20 mb-6'>
      {/* Bouton Retour */}
      <div className='w-[90%] max-w-[600px] mx-auto mb-6 mt-4 md:mt-0'>
        <Link
          href='/'
          className='w-32 md:w-36 px-3 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[12px] md:text-[14px]'
        >
          Retour
        </Link>
      </div>

      {/* Contenu principal */}
      <div className='w-[90%] max-w-[600px] h-auto mx-auto p-6 md:p-10 bg-gray-800 text-white shadow-md rounded-md border'>
        <h1 className='text-2xl md:text-3xl font-semibold text-center mb-6'>
          Liste des articles
        </h1>

        {/* Barre blanche */}
        <span className='block w-full h-1 bg-white my-6 md:my-10'></span>

        {error && <p className='text-center text-red-500'>{error}</p>}

        {articles.length > 0 ? (
          <ul className='space-y-4'>
            {articles.map((article) => (
              <li
                key={article.id_article}
                className='flex flex-col md:flex-row justify-between items-center p-4 bg-gray-700 rounded-md text-sm md:text-base'
              >
                <div className='flex flex-col md:flex-row md:space-x-4 md:items-center w-full'>
                  <span className='font-semibold'>{article.id_article}</span>
                  <span className='font-semibold'>{article.titre_article}</span>
                  <span className='font-semibold'>
                    {new Date(article.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Bouton de suppression */}
                <button
                  onClick={() => deleteArticle(article.id_article)}
                  className='mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700'
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-400'>Aucun article trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default AdminArticlesPage;
