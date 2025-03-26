'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Importation du hook useSession de next-auth

type Category = {
  id_categorie: number;
  nom_categorie: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Utilisation de useSession pour récupérer les informations de session
  const { data: session, status } = useSession();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Si l'utilisateur est connecté, récupère son rôle
    if (session?.user) {
      setUserRole(session.user.roles); // 'role' doit être un champ dans l'objet utilisateur
    }
  }, [session]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='w-full min-h-screen h-auto bg-gray-900 text-white pt-10 pb-20 flex flex-col'>
      <div className='w-[90%] mx-auto mt-[60px] flex flex-col md:flex-row items-center md:items-center justify-between'>
        <div className='flex items-center space-x-4 w-full md:w-[60%]'>
          <h2 className='bg-gray-800 rounded-md shadow-md text-white text-base md:text-lg font-bold border p-2 md:p-3 text-center w-full md:w-[25%] flex items-center justify-center'>
            Toutes les catégories
          </h2>

          {/* Affiche le bouton 'Créer une catégorie' seulement si l'utilisateur est un Admin */}
          {userRole === 'Admin' && (
            <Link
              href='/categories/create'
              className='w-28 md:w-36 px-3 py-2 md:px-4 md:py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold mx-auto block text-center z-10 text-[12px] md:text-[14px]'
            >
              <p>Créer une catégorie</p>
            </Link>
          )}
        </div>
      </div>

      <div className='w-[90%] mx-auto mt-6 md:mt-10 border flex-grow'>
        {loading ? (
          <p>Chargement des catégories...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div className='bg-gray-800 p-4 md:p-6 rounded-md shadow-md'>
            <h3 className='text-xl md:text-2xl font-bold text-white mb-4'>
              Catégories disponibles
            </h3>
            <ul className='space-y-4'>
              {categories.map((category) => (
                <li
                  key={category.id_categorie}
                  className='p-3 md:p-4 bg-gray-700 rounded-md'
                >
                  <h4 className='text-lg md:text-xl text-white'>
                    {category.nom_categorie}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
